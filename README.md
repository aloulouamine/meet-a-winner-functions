# Cloud Functions / Meet a Winner // GDG Lille ([@GDGLille](https://twitter.com/GDGLille)) 

[![Build Status](http://jenkins.bodul.fr/buildStatus/icon?job=GDG-Lille/meet-a-winner-functions/master)](http://jenkins.bodul.fr/job/GDG-Lille/meet-a-winner-functions/master)

[![Quality Gate](https://sonarcloud.io/api/badges/gate?key=meet-a-winner-functions)](https://sonarcloud.io/dashboard/index/meet-a-winner-functions)
[![Lines of Codes](https://sonarcloud.io/api/badges/measure?key=meet-a-winner-functions&metric=ncloc&blinking=true)](https://sonarcloud.io/dashboard/index/meet-a-winner-functions)
[![Blocker Violations](https://sonarcloud.io/api/badges/measure?key=meet-a-winner-functions&metric=blocker_violations&blinking=true)](https://sonarcloud.io/dashboard/index/meet-a-winner-functions)
[![Critical Violations](https://sonarcloud.io/api/badges/measure?key=meet-a-winner-functions&metric=critical_violations&blinking=true)](https://sonarcloud.io/dashboard/index/meet-a-winner-functions)
[![Bugs](https://sonarcloud.io/api/badges/measure?key=meet-a-winner-functions&metric=bugs&blinking=true)](https://sonarcloud.io/dashboard/index/meet-a-winner-functions)
[![Code Smells](https://sonarcloud.io/api/badges/measure?key=meet-a-winner-functions&metric=code_smells&blinking=true)](https://sonarcloud.io/dashboard/index/meet-a-winner-functions)

## Made with ...
* [NPM](https://www.npmjs.com/) 
* [Typescript](https://www.typescriptlang.org/)
* [Firebase](https://firebase.google.com)

## How to build in production ?

Nothing to do, [Jenkins](https://jenkins.io/) does it :) (@see Jenkinsfile)

## How to test locally ?

First, you have to install [Firebase tools](https://github.com/firebase/firebase-tools) via `npm install -g firebase-tools`.

Now, go in the worker directory, go further in the **functions** directory and :
* Play `firebase functions:config:get > .runtimeconfig.json` ;
* Play `npm run serve` ;
* Let the magic happen

## What's in the box ?

There are 3 functions 
* *getLastTweetsOfGDGLille* which retrieve the last 10 tweets of the [@GDGLille](https://twitter.com/GDGLille) Twitter account ;
* *getLastMeetupsOfGDGLille* which retrieve the last 20 upcoming meetups of the [GDG-Lille](https://www.meetup.com/fr-FR/GDG-Lille/) Meetup account ;
* *getRandomlyAWinner* which find a winner randomly over multiple platforms (e.g. Twitter, Meetup).

## Contact via [Issues](https://github.com/GDG-Lille/meet-a-winner/issues) on the [meet-a-winner](https://github.com/GDG-Lille/meet-a-winner) project
Helpful for **question**, **bug** and **contribution request**.

