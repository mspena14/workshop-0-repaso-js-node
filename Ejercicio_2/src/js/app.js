class Note {
  constructor(id, description, isImportant = false) {
    this.id = id;
    this.description = description;
    this.isImportant = isImportant;
  }

  toggleImportance() {
    this.isImportant = !this.isImportant;
  }
}

class NoteManager {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];
    this.loadNotes();
    this.id = undefined;
  }

  addNote(description) {
    if (!(this.id == undefined)) {
      this.updateNote(description);
    } else {
      const id = this.notes.length
        ? this.notes[this.notes.length - 1].id + 1 : 1;
      const note = new Note(id, description);
      this.notes.push(note);
    }

    this.saveNotes();
    this.renderNotes();
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveNotes();
    this.renderNotes();
  }

  showNoteInfo(id, description) {
    this.id = id;
    const preNote = document.getElementById("new-note");
    preNote.value = description;
  }

  updateNote(noteModified) {
    const noteFound = this.notes.findIndex((note) => note.id == this.id);
    this.notes[noteFound].description = noteModified;
    this.id = undefined;
    this.saveNotes();
    this.renderNotes();
  }

  toggleNoteImportance(id) {
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      const noteIntance = new Note(note.id, note.description, note.isImportant);
      noteIntance.toggleImportance();
      this.notes = this.notes.map((noteTog) =>
        noteTog.id === id ? noteIntance : noteTog
      );
      this.saveNotes();
      this.renderNotes();
    }
  }

  saveNotes() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  loadNotes() {
    this.renderNotes();
  }

  renderNotes() {
    const noteList = document.getElementById("notes-list");
    noteList.innerHTML = "";
    this.notes.forEach((note) => {
      const item = document.createElement("li");

      if (note.isImportant) {
        const strongText = document.createElement("strong");
        strongText.textContent = note.description;
        item.appendChild(strongText);
      } else {
        item.textContent = note.description;
      }


      item.addEventListener("click", () => this.toggleNoteImportance(note.id));

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.addEventListener("click", (e) => {
        this.deleteNote(note.id);
      });

      const updateButton = document.createElement("button");
      updateButton.textContent = "Editar";
      updateButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
        this.showNoteInfo(note.id, note.description);
      });

      item.appendChild(updateButton);
      item.appendChild(deleteButton);
      noteList.appendChild(item);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const noteManager = new NoteManager();

  document.getElementById("add-note").addEventListener("click", () => {
    const newNote = document.getElementById("new-note").value;
    if (newNote) {
      noteManager.addNote(newNote);
      document.getElementById("new-note").value = "";
    }
  });
});
