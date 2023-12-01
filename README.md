# NoteApp

## About

This is the second version of my note app, which is also a showcase of the skills I have mastered and the tools and solutions I have learned so far.

The application has been equipped with firebase, including auth, firestore and security, so the user to use it - must create an account. Once the account is created, there is an automatic login (Firebase behavior), the application greets the user via special note and the user can already create new notes and delete existing ones. All data is stored in Firestore (NoSQL database).

If the user accidentally closes the browser, the session will be remembered and there will be no need to log in again. The application also includes full error handling.

## Coding & Problems

Firebase has rather strange and sometimes poor documentation, so in some cases it was quite time-consuming to find the cause of a particular behavior. Example? A retrieval error to correctly display a username that required adding just one line of code to get everything working properly.

## Milestones

Addition of note editing based on delete and add functionality and sorting of notes by date to 100% fool the user (Firestore made me do it).

## Links & Tools

**NoSQL database:** [Firebase](https://firebase.google.com/)

**Used:** HTML, SASS (CSS preprocessor), React (incl. Redux), TypeScript, Vite, Yup

**URL:** [Note-App](https://noteapp.online/)
