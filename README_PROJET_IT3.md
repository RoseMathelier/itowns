# ROS + iTowns

Ce projet a pour but d'intégrer des données issues des acquisitons ROS dans la plateforme iTowns. 



        
Pour cela, nous nous basons sur les bibliothèques ROSlibjs, qui permetd'extraire des informations de messages prédéfinis, et ROS3Djs qui permet d'afficher les données en webGL. 
Seulement la surcouche webGL d'iTowns n'est pas compatible avec le surcouche webGL de ROS 3D, il faut donc adapter les deux librairies.


![alt text](readme_image.png)

## Table des matières

1. [Installation](#installation)
2. [Implémentation](#impl%C3%A9mentation)
3. [Lancement de l'application](#lancement-de-lacquisiton)
4. [API](#api)
5. [Problèmes rencontrés](#probl%C3%A8mes-rencontr%C3%A9s)
6. [Améliorations](#am%C3%A9liorations) 

## Installation  

### itowns
.. to do ..

### ROS
.. to do ..

**[Retour en haut de la page](#table-des-matières)** 

## Implémentation

L'implémentation comprend plusieurs étapes : 
- Création et diffusion des données ROS (webSockets)
- Récupération des différents messages proposés par ROS 
- Création d'un menu en fonction des messages reçus
- Interaction avec le menu par le biais d'un affichage des données (utilisation des handlers existants et création si besoin)
- Correction de la librairie ros3Djs
- Affichage des données ROS et tests en localhost
- Re-agencement des repères de chaque message
- Intégration de l'implémentation dans itowns

## Lancement de l'acquisiton

### Lancement du serveur
.. to do ..

### Lancement du RosBag de test
.. to do ..


**[Retour en haut de la page](#table-des-matières)** 

## API

### Les messages proposés

![alt text](affichageMenu.png)

### Visualisation des résultats

Les différents messages .. to do ..

## Problèmes rencontrés

### Librairie ROS3Djs non fonctionnelle

... to do ... (le problème rencontré + solution proposée)


### Outils de developpement compliqué à manipuler

... to do ... (pb c'est importation en dur dans le code, donc fork, rawgit pour accéder au code modifié car pas d'accès comme une librairie et nouvelle version de commit à chaque fois)

**[Retour en haut de la page](#table-des-matières)** 

## Améliorations

.. to do ..

**[Retour en haut de la page](#table-des-matières)** 

## Authors

* **Rose Mathelier**
* **Augustin Gagnon**
* **Laure Le Breton**

**[Retour en haut de la page](#table-des-matières)** 
