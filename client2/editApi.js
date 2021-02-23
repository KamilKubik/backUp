import streams from "./src/apis/streams";

// To jest podejście z tablicą: (czyli, że zwracamy tablicę)

const arrayEditReducer = (state = [], action) => {
  switch (action.type) {
    case "EDIT_STREAM":
      return streams.map((stream) => {
        if (stream.id === action.payload.id) {
          return action.payload;
        } else {
          return stream;
        }
      });
    default:
      return state;
  }
};

// To jest podejście z obiektem: (czyli, że zwracamy objekt)

const objectEditReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_STREAM":
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
      // Ten kod powyżej jest dłuższą wersją, a ten poniżej krótszą wersją
      return { ...state, [action.payload.id]: action.payload }; // zakładamy tutaj, że każdy nasz element ma key jako id jakby, czyli np. 5: action.payload
    default:
      return state;
  }
};

// Jak więc działa taki zapis?

const animals = { 0: "cat", 1: "dog", 2: "lion" };

const fourthAnimal = 4;
const tiger = "tiger";

const newAnimals = { ...animals, [fourthAnimal]: tiger };

console.log(newAnimals);