export interface Question {
  id: number;
  correctAnswer: string;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    correctAnswer: "A",
    explanation: "HTML stands for Hyper Text Markup Language. It's the standard language used to create and structure content on web pages.",
  },
  {
    id: 2,
    correctAnswer: "C",
    explanation: "In Python, the # symbol is used for single-line comments. // is used in JavaScript/Java/C++, and /* */ is for multi-line comments.",
  },
  {
    id: 3,
    correctAnswer: "A",
    explanation: "JavaScript is called the 'language of the web' because it's the only programming language that runs natively in web browsers for front-end development.",
  },
  {
    id: 4,
    correctAnswer: "D",
    explanation: "CSS stands for Cascading Style Sheets. 'Cascading' refers to how styles are applied in a priority order — the cascade determines which style wins when there are conflicts.",
  },
  {
    id: 5,
    correctAnswer: "B",
    explanation: "Boolean is the data type that stores only two values: true or false. It's named after mathematician George Boole who invented Boolean algebra.",
  },
  {
    id: 6,
    correctAnswer: "C",
    explanation: "The <p> tag in HTML creates a paragraph. <b> makes text bold, <a> creates links, and <img> adds images.",
  },
  {
    id: 7,
    correctAnswer: "A",
    explanation: "Photoshop is an image editing software by Adobe, not a programming language. Python, Java, and Ruby are all programming languages.",
  },
  {
    id: 8,
    correctAnswer: "D",
    explanation: "A variable stores a value in programming. Think of it like a labeled box — you put data inside and refer to it by the variable name.",
  },
  {
    id: 9,
    correctAnswer: "C",
    explanation: "JavaScript uses curly braces { } to group code blocks. Python uses indentation instead, and HTML/CSS use tags, not braces.",
  },
  {
    id: 10,
    correctAnswer: "B",
    explanation: "The correct file extension for Python files is .py — short for Python. This tells the computer the file contains Python code.",
  },
];
