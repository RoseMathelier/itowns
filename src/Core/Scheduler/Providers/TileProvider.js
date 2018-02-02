/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import * as THREE from 'three';
import Provider from './Provider';
import TileGeometry from '../../TileGeometry';
import TileMesh from '../../TileMesh';
import CancelledCommandException from '../CancelledCommandException';
import { requestNewTile } from '../../../Process/TiledNodeProcessing';
import RendererConstant from '../../../Renderer/RendererConstant';
import Picking from '../../Picking';

function changeRenderState(tileLayer) {
    let _renderState = RendererConstant.FINAL;
    return function _changeRenderState(newRenderState) {
        if (_renderState == newRenderState || !tileLayer.level0Nodes) {
            return;
        }

        // build traverse function
        var changeStateFunction = (function getChangeStateFunctionFn() {
            return function changeStateFunction(object3D) {
                if (object3D.changeState) {
                    object3D.changeState(newRenderState);
                }
            };
        }());

        for (const n of tileLayer.level0Nodes) {
            n.traverseVisible(changeStateFunction);
        }
        _renderState = newRenderState;
    };
}

function TileProvider() {
    Provider.call(this, null);
    this.cacheGeometry = new Map();
}

TileProvider.prototype = Object.create(Provider.prototype);

TileProvider.prototype.constructor = TileProvider;

TileProvider.prototype.preprocessDataLayer = function preprocessLayer(layer, view, scheduler) {
    if (!layer.schemeTile) {
        throw new Error(`Cannot init tiled layer without schemeTile for layer ${layer.id}`);
    }

    layer.level0Nodes = [];
    layer.onTileCreated = layer.onTileCreated || (() => {});
    layer.changeRenderState = changeRenderState(layer);
    // provide custom pick function
    layer.pickObjectsAt = (_view, mouse) => Picking.pickTilesAt(_view, mouse, layer);

    const promises = [];

    for (const root of layer.schemeTile) {
        promises.push(requestNewTile(view, scheduler, layer, root, undefined, 0));
    }
    return Promise.all(promises).then((level0s) => {
        layer.level0Nodes = level0s;
        for (const level0 of level0s) {
            layer.object3d.add(level0);
            level0.updateMatrixWorld();
        }
    });
};

const worldQuaternion = new THREE.Quaternion();
TileProvider.prototype.executeCommand = function executeCommand(command) {
    const extent = command.extent;
    if (command.requester &&
        !command.requester.material) {
        // request has been deleted
        return Promise.reject(new CancelledCommandException(command));
    }
    const layer = command.layer;
    const builder = layer.builder;
    const parent = command.requester;
    const level = (command.level === undefined) ? (parent.level + 1) : command.level;

    const { sharableExtent, quaternion, position } = builder.computeSharableExtent(extent);
    const south = sharableExtent.south().toFixed(6);
    const segment = layer.segments || 16;
    const key = `${builder.type}_${layer.disableSkirt ? 0 : 1}_${segment}_${level}_${south}`;

    let geometry = this.cacheGeometry.get(key);
    // build geometry if doesn't exist
    if (!geometry) {
        const paramsGeometry = {
            extent: sharableExtent,
            level,
            segment,
            disableSkirt: layer.disableSkirt,
        };

        geometry = new TileGeometry(paramsGeometry, builder);
        this.cacheGeometry.set(key, geometry);

        geometry._count = 0;
        geometry.dispose = () => {
            geometry._count--;
            if (geometry._count == 0) {
                THREE.BufferGeometry.prototype.dispose.call(geometry);
                this.cacheGeometry.delete(key);
            }
        };
    }

    // build tile
    const params = {
        layerId: layer.id,
        extent,
        level,
        materialOptions: layer.materialOptions,
    };

    geometry._count++;
    const tile = new TileMesh(geometry, params);
    tile.layer = layer.id;
    tile.layers.set(command.threejsLayer);

    if (parent) {
        position.applyMatrix4(layer.object3d.matrixWorld);
        parent.worldToLocal(position);
        worldQuaternion.setFromRotationMatrix(parent.matrixWorld).inverse().multiply(layer.object3d.quaternion);
        quaternion.premultiply(worldQuaternion);
    }

    tile.position.copy(position);
    tile.quaternion.copy(quaternion);

    tile.material.transparent = layer.opacity < 1.0;
    tile.material.uniforms.opacity.value = layer.opacity;
    tile.setVisibility(false);
    tile.updateMatrix();

    if (parent) {
        tile.setBBoxZ(parent.OBB().z.min, parent.OBB().z.max);
    } else if (layer.materialOptions && layer.materialOptions.useColorTextureElevation) {
        tile.setBBoxZ(layer.materialOptions.colorTextureElevationMinZ, layer.materialOptions.colorTextureElevationMaxZ);
    }

    return Promise.resolve(tile);
};

export default TileProvider;
