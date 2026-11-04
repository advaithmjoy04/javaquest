// JavaQuest Curriculum — curriculum.js
// 24 Modules (B1-B8, I1-I8, A1-A8) according to the official JavaQuest Roadmap
// Includes interactive Coding Challenges with Attempt-Based Scoring:
// Attempt 1: 100 XP | Attempt 2: 75 XP | Attempt 3: 50 XP | Attempt 4+: 25 XP (Fixed)

const CURRICULUM = [
  {
    "id": "b1",
    "code": "B1",
    "level": "beginner",
    "title": "Java Orientation & Setup",
    "subtitle": "Source code, bytecode, JVM, JRE and JDK roles",
    "icon": "☕",
    "color": "#6C63FF",
    "lessons": [
      {
        "id": "lesson-b1-1",
        "title": "What is Java & The JVM",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Welcome to Java 21+",
            "content": "Java was created by James Gosling in 1995. Its core superpower is **\"Write Once, Run Anywhere\" (WORA)**. Millions of backend systems, Android apps, and high-performance services run on modern Java 21 LTS."
          },
          {
            "type": "visual",
            "visual": "flowchart",
            "title": "How Code Runs",
            "content": "Your `.java` source code is compiled by **javac** into portable **bytecode** (`.class` files). The **Java Virtual Machine (JVM)** executes this bytecode on any OS."
          },
          {
            "type": "code",
            "title": "Anatomy of Main",
            "content": "Every standalone Java program starts execution at the `public static void main(String[] args)` method inside a class.",
            "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, JavaQuest!\");\n    }\n}"
          },
          {
            "type": "tip",
            "title": "JDK vs JRE vs JVM",
            "content": "**JDK** (Java Development Kit) includes tools like `javac` compiler and debugger.\n**JRE** (Java Runtime Environment) provides libraries to run code.\n**JVM** (Virtual Machine) executes bytecode into machine code."
          }
        ]
      },
      {
        "id": "lesson-b1-2",
        "title": "Class Structure & Comments",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Classes as Containers",
            "content": "In Java, everything lives inside a `class`. The file name must match the public class name (e.g. `Main.java` contains `public class Main`)."
          },
          {
            "type": "code",
            "title": "Comments in Java",
            "content": "Use `//` for single-line comments and `/* ... */` for multi-line comments. Java ignores them during compilation.",
            "code": "// Single-line note\n/* Multi-line\n   documentation */\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Clean code has comments!\");\n    }\n}"
          },
          {
            "type": "tip",
            "title": "Checkpoint: Run Hello World",
            "content": "Test compiling via terminal: `javac Main.java` followed by `java Main`."
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-b1",
      "xp": 50,
      "questions": [
        {
          "type": "mcq",
          "question": "Which component executes Java bytecode at runtime?",
          "options": [
            "JVM",
            "javac compiler",
            "Javadoc",
            "JShell"
          ],
          "answer": 0,
          "explanation": "The JVM (Java Virtual Machine) loads and executes compiled bytecode."
        },
        {
          "type": "true-false",
          "question": "The javac compiler converts Java source code directly into machine machine code.",
          "answer": false,
          "explanation": "javac compiles source code into intermediate bytecode (.class), which the JVM runs."
        },
        {
          "type": "output",
          "question": "What does this code output?",
          "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.print(\"A\");\n        System.out.println(\"B\");\n    }\n}",
          "options": [
            "AB on one line",
            "A and B on separate lines",
            "Compile error",
            "BA"
          ],
          "answer": 0,
          "explanation": "print(\"A\") does not emit a newline, so \"B\" prints right after it on the same line."
        }
      ]
    },
    "codingTask": {
      "id": "code-b1",
      "title": "B1: Hello JavaQuest Console",
      "prompt": "Write a Java program in the `Main` class that prints:\nLine 1: `Hello, JavaQuest!`\nLine 2: `Java 21 Ready`",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Print Hello, JavaQuest! on first line\n        // Print Java 21 Ready on second line\n    }\n}",
      "expectedOutput": "Hello, JavaQuest!\nJava 21 Ready",
      "testCases": [
        {
          "name": "Contains Hello, JavaQuest!",
          "expected": "Hello, JavaQuest!"
        },
        {
          "name": "Contains Java 21 Ready",
          "expected": "Java 21 Ready"
        }
      ],
      "hints": [
        "Use System.out.println() twice.",
        "Make sure spelling, comma, and exclamation mark match exactly."
      ]
    }
  },
  {
    "id": "b2",
    "code": "B2",
    "level": "beginner",
    "title": "Variables, Data Types & Input",
    "subtitle": "Primitives, reference types, casting and Scanner input",
    "icon": "📦",
    "color": "#43D8C9",
    "lessons": [
      {
        "id": "lesson-b2-1",
        "title": "Primitive Types & Memory",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Strongly Typed Language",
            "content": "Java requires every variable to declare its type. Java has 8 **primitive types**: `byte`, `short`, `int`, `long` (integers), `float`, `double` (decimals), `char` (character), and `boolean` (true/false)."
          },
          {
            "type": "visual",
            "visual": "memory",
            "visualData": [
              {
                "type": "int",
                "name": "age",
                "value": 21
              },
              {
                "type": "double",
                "name": "gpa",
                "value": 3.85
              },
              {
                "type": "boolean",
                "name": "enrolled",
                "value": "true"
              }
            ],
            "title": "Stack Memory",
            "content": "Primitives live directly on the stack with their actual value."
          },
          {
            "type": "code",
            "title": "Declaring Variables",
            "content": "Syntax: `type variableName = value;`",
            "code": "public class Main {\n    public static void main(String[] args) {\n        int heroLevel = 5;\n        double health = 98.5;\n        boolean hasPotion = true;\n        char rank = 'A';\n        System.out.println(\"Hero Level: \" + heroLevel);\n    }\n}"
          }
        ]
      },
      {
        "id": "lesson-b2-2",
        "title": "Type Casting & User Input",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Widening vs Narrowing Casting",
            "content": "**Widening** (automatic): smaller to larger type (e.g. `int` to `double`).\n**Narrowing** (manual): larger to smaller type, requiring cast syntax: `(int) 3.99`."
          },
          {
            "type": "code",
            "title": "Scanner for Input",
            "content": "Use `java.util.Scanner` to read keyboard input.",
            "code": "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.out.nextLine());\n        // sc.nextInt(), sc.nextDouble(), sc.nextLine()\n    }\n}"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-b2",
      "xp": 50,
      "questions": [
        {
          "type": "mcq",
          "question": "Which is a primitive Java type?",
          "options": [
            "String",
            "Integer",
            "boolean",
            "ArrayList"
          ],
          "answer": 2,
          "explanation": "boolean is primitive; String, Integer, and ArrayList are reference objects."
        },
        {
          "type": "output",
          "question": "What is the output of this casting operation?",
          "code": "double d = 9.85;\nint x = (int) d;\nSystem.out.println(x);",
          "options": [
            "9",
            "10",
            "9.85",
            "Compile error"
          ],
          "answer": 0,
          "explanation": "Narrowing cast (int) truncates the decimal portion, yielding 9 without rounding."
        },
        {
          "type": "true-false",
          "question": "In Java, a variable can change its declared type at runtime.",
          "answer": false,
          "explanation": "Java is statically typed: a variable type cannot change once declared."
        }
      ]
    },
    "codingTask": {
      "id": "code-b2",
      "title": "B2: User Profile Formatter",
      "prompt": "Declare variables:\n- `String name = \"Alex\";`\n- `int age = 20;`\n- `double gpa = 3.75;`\nPrint the profile in this exact format:\n`Name: Alex | Age: 21 next year | GPA: 3.75`",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        String name = \"Alex\";\n        int age = 20;\n        double gpa = 3.75;\n        \n        // Print: Name: Alex | Age: 21 next year | GPA: 3.75\n    }\n}",
      "expectedOutput": "Name: Alex | Age: 21 next year | GPA: 3.75",
      "testCases": [
        {
          "name": "Profile Format Match",
          "expected": "Name: Alex | Age: 21 next year | GPA: 3.75"
        }
      ],
      "hints": [
        "Calculate age + 1 for next year.",
        "Use string concatenation with +."
      ]
    }
  },
  {
    "id": "b3",
    "code": "B3",
    "level": "beginner",
    "title": "Operators & Expressions",
    "subtitle": "Arithmetic, relational, logical operators and precedence",
    "icon": "🔢",
    "color": "#FFD166",
    "lessons": [
      {
        "id": "lesson-b3-1",
        "title": "Arithmetic & Modulus",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Math in Java",
            "content": "Java provides `+`, `-`, `*`, `/`, and `%` (modulus / remainder). Beware of **integer division**: dividing two ints truncates decimals!"
          },
          {
            "type": "code",
            "title": "Integer Division Traps",
            "content": "`7 / 2` is `3`, not `3.5`. To get a double result, at least one operand must be a double: `7.0 / 2` is `3.5`.",
            "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(7 / 2);      // prints 3\n        System.out.println(7.0 / 2);    // prints 3.5\n        System.out.println(7 % 2);      // remainder: 1\n    }\n}"
          }
        ]
      },
      {
        "id": "lesson-b3-2",
        "title": "Logical & Ternary Operators",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Making Logical Decisions",
            "content": "Use `&&` (AND), `||` (OR), and `!` (NOT). Java uses **short-circuit evaluation**: if the first operand of `&&` is false, it skips evaluating the second."
          },
          {
            "type": "code",
            "title": "Ternary Operator",
            "content": "`condition ? valueIfTrue : valueIfFalse`",
            "code": "public class Main {\n    public static void main(String[] args) {\n        int score = 85;\n        String result = (score >= 60) ? \"PASS\" : \"FAIL\";\n        System.out.println(result);\n    }\n}"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-b3",
      "xp": 50,
      "questions": [
        {
          "type": "mcq",
          "question": "What is the result of 7 / 2 when both operands are int?",
          "options": [
            "3",
            "3.5",
            "4",
            "Compile-time error"
          ],
          "answer": 0,
          "explanation": "Integer division in Java truncates the fractional part, yielding 3."
        },
        {
          "type": "output",
          "question": "What does this code output?",
          "code": "int x = 5;\nx *= 3;\nx -= 4;\nSystem.out.println(x);",
          "options": [
            "11",
            "15",
            "19",
            "10"
          ],
          "answer": 0,
          "explanation": "5 * 3 = 15; 15 - 4 = 11."
        },
        {
          "type": "true-false",
          "question": "The expression (5 > 3 || 10 / 0 == 0) throws an ArithmeticException at runtime.",
          "answer": false,
          "explanation": "Because 5 > 3 is true, short-circuit OR (||) does not evaluate the second operand."
        }
      ]
    },
    "codingTask": {
      "id": "code-b3",
      "title": "B3: Discount Calculator",
      "prompt": "Write a program with `double originalPrice = 120.0;` and `double discountPercent = 15.0;`\n1. Calculate discounted price: `originalPrice * (1 - discountPercent / 100)`\n2. If discounted price is over 100, apply an extra $5 coupon: `price - 5.0`\n3. Print: `Final Price: $97.0` (format with 1 decimal).",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        double originalPrice = 120.0;\n        double discountPercent = 15.0;\n        \n        double discounted = originalPrice * (1 - discountPercent / 100.0);\n        if (discounted > 100.0) {\n            discounted -= 5.0;\n        }\n        System.out.println(\"Final Price: $\" + discounted);\n    }\n}",
      "expectedOutput": "Final Price: $97.0",
      "testCases": [
        {
          "name": "Calculates Final Price with Coupon",
          "expected": "Final Price: $97.0"
        }
      ],
      "hints": [
        "Multiply originalPrice by (1 - discountPercent / 100.0).",
        "Check if discounted > 100.0 and subtract 5.0."
      ]
    }
  },
  {
    "id": "b4",
    "code": "B4",
    "level": "beginner",
    "title": "Decision Making & Loops",
    "subtitle": "if/else, switch expressions, while, for and do-while loops",
    "icon": "🔄",
    "color": "#06D6A0",
    "lessons": [
      {
        "id": "lesson-b4-1",
        "title": "If, Else & Modern Switch",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Branching Logic",
            "content": "Branching lets programs choose execution paths using `if`, `else if`, and `else`."
          },
          {
            "type": "code",
            "title": "Modern Switch Expressions (Java 14+)",
            "content": "Modern Java supports arrow syntax `->` in switch expressions without break statements!",
            "code": "int day = 3;\nString name = switch (day) {\n    case 1 -> \"Monday\";\n    case 2 -> \"Tuesday\";\n    case 3 -> \"Wednesday\";\n    default -> \"Other\";\n};\nSystem.out.println(name);"
          }
        ]
      },
      {
        "id": "lesson-b4-2",
        "title": "Loops: for, while & do-while",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Repetition in Code",
            "content": "Loops repeat code. `for` when count is known, `while` when condition-driven, and `do-while` when body must run at least once."
          },
          {
            "type": "visual",
            "visual": "loop",
            "visualData": {
              "start": 1,
              "end": 5,
              "varName": "i"
            },
            "title": "Loop Tracer",
            "content": "Step-by-step tracing of loop variable i."
          },
          {
            "type": "code",
            "title": "Break and Continue",
            "content": "`break` exits loop immediately; `continue` skips to the next iteration.",
            "code": "for (int i = 1; i <= 5; i++) {\n    if (i == 3) continue; // skip 3\n    System.out.print(i + \" \");\n}"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-b4",
      "xp": 50,
      "questions": [
        {
          "type": "mcq",
          "question": "Which loop checks its condition after executing the body?",
          "options": [
            "for",
            "while",
            "do-while",
            "enhanced for"
          ],
          "answer": 2,
          "explanation": "A do-while loop always executes the body once before evaluating its condition."
        },
        {
          "type": "output",
          "question": "What does this loop print?",
          "code": "int count = 0;\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 2; j++) count++;\n}\nSystem.out.println(count);",
          "options": [
            "5",
            "6",
            "3",
            "9"
          ],
          "answer": 1,
          "explanation": "The outer loop runs 3 times; the inner loop runs 2 times per outer loop: 3 * 2 = 6."
        },
        {
          "type": "true-false",
          "question": "The continue statement terminates the entire loop and jumps out of it.",
          "answer": false,
          "explanation": "continue skips only the current iteration; break terminates the entire loop."
        }
      ]
    },
    "codingTask": {
      "id": "code-b4",
      "title": "B4: FizzBuzz Counter",
      "prompt": "Write a loop from 1 to 15. For each number:\n- If divisible by both 3 and 5, print `FizzBuzz`\n- Else if divisible by 3, print `Fizz`\n- Else if divisible by 5, print `Buzz`\n- Otherwise, print the number\n(Each on a new line)",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 15; i++) {\n            if (i % 15 == 0) System.out.println(\"FizzBuzz\");\n            else if (i % 3 == 0) System.out.println(\"Fizz\");\n            else if (i % 5 == 0) System.out.println(\"Buzz\");\n            else System.out.println(i);\n        }\n    }\n}",
      "expectedOutput": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
      "testCases": [
        {
          "name": "FizzBuzz 1 to 15 Sequence",
          "expected": "FizzBuzz"
        }
      ],
      "hints": [
        "Check for % 15 == 0 first before % 3 or % 5.",
        "Use if-else ladder."
      ]
    }
  },
  {
    "id": "b5",
    "code": "B5",
    "level": "beginner",
    "title": "Methods & Scope",
    "subtitle": "Parameters, return values, overloading and call stack",
    "icon": "🛠️",
    "color": "#F72585",
    "lessons": [
      {
        "id": "lesson-b5-1",
        "title": "Declaring & Calling Methods",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Reusable Building Blocks",
            "content": "A method is a block of code designed to perform a specific task. Methods improve reusability and maintainability."
          },
          {
            "type": "code",
            "title": "Method Anatomy",
            "content": "`returnType methodName(parameters) { ... }`",
            "code": "public class Main {\n    static int add(int a, int b) {\n        return a + b;\n    }\n    public static void main(String[] args) {\n        int sum = add(10, 20);\n        System.out.println(\"Sum: \" + sum);\n    }\n}"
          }
        ]
      },
      {
        "id": "lesson-b5-2",
        "title": "Method Overloading & Scope",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Method Overloading",
            "content": "Multiple methods can have the same name if they have different parameter lists (different types, counts, or order)."
          },
          {
            "type": "code",
            "title": "Overloading Example",
            "content": "Notice `multiply(int, int)` vs `multiply(double, double)`.",
            "code": "static int multiply(int a, int b) { return a * b; }\nstatic double multiply(double a, double b) { return a * b; }"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-b5",
      "xp": 50,
      "questions": [
        {
          "type": "mcq",
          "question": "What does a method's return type describe?",
          "options": [
            "Its access level",
            "The kind of value it returns",
            "Its parameter count",
            "Its class name"
          ],
          "answer": 1,
          "explanation": "The return type specifies the data type of the value returned, or void if none."
        },
        {
          "type": "output",
          "question": "What is the output?",
          "code": "public class Main {\n    static int f(int x) { return x * 2; }\n    public static void main(String[] args) {\n        System.out.println(f(f(3)));\n    }\n}",
          "options": [
            "6",
            "12",
            "9",
            "Compile error"
          ],
          "answer": 1,
          "explanation": "f(3) is 6; then f(6) is 12."
        },
        {
          "type": "true-false",
          "question": "Two methods in the same class can have the same name and identical parameter lists if their return types differ.",
          "answer": false,
          "explanation": "In Java, return type alone cannot be used to overload a method."
        }
      ]
    },
    "codingTask": {
      "id": "code-b5",
      "title": "B5: Temperature Converter Method",
      "prompt": "Implement a static method `celsiusToFahrenheit(double c)` that computes:\n`F = (c * 9.0 / 5.0) + 32.0`\nIn main, call it with 25.0 and print: `25.0 C = 77.0 F`",
      "starterCode": "public class Main {\n    public static double celsiusToFahrenheit(double c) {\n        return (c * 9.0 / 5.0) + 32.0;\n    }\n    public static void main(String[] args) {\n        double c = 25.0;\n        double f = celsiusToFahrenheit(c);\n        System.out.println(c + \" C = \" + f + \" F\");\n    }\n}",
      "expectedOutput": "25.0 C = 77.0 F",
      "testCases": [
        {
          "name": "Convert 25C to 77F",
          "expected": "25.0 C = 77.0 F"
        }
      ],
      "hints": [
        "Use floating-point division 9.0 / 5.0, not 9 / 5."
      ]
    }
  },
  {
    "id": "b6",
    "code": "B6",
    "level": "beginner",
    "title": "Arrays & Strings",
    "subtitle": "1D/2D arrays, String immutability, StringBuilder",
    "icon": "📊",
    "color": "#4CC9F0",
    "lessons": [
      {
        "id": "lesson-b6-1",
        "title": "Arrays in Java",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Fixed-Size Sequences",
            "content": "An array holds elements of the same type in contiguous memory. Indexing starts at `0` and length is fixed at creation."
          },
          {
            "type": "code",
            "title": "Creating & Iterating Arrays",
            "content": "Use enhanced for-each loop to traverse.",
            "code": "int[] numbers = {10, 20, 30, 40};\nfor (int n : numbers) {\n    System.out.println(n);\n}"
          }
        ]
      },
      {
        "id": "lesson-b6-2",
        "title": "String Immutability & StringBuilder",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Strings Are Immutable",
            "content": "In Java, String objects cannot be modified after creation. Operations like `.toUpperCase()` return a brand new String!"
          },
          {
            "type": "code",
            "title": "Using StringBuilder",
            "content": "For heavy string concatenation inside loops, use `StringBuilder` for high performance.",
            "code": "StringBuilder sb = new StringBuilder();\nsb.append(\"Hello\").append(\" \").append(\"World\");\nSystem.out.println(sb.toString());"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-b6",
      "xp": 50,
      "questions": [
        {
          "type": "mcq",
          "question": "Which statement about String is true in Java?",
          "options": [
            "String objects are mutable",
            "String is a primitive",
            "String is immutable",
            "String cannot be compared"
          ],
          "answer": 2,
          "explanation": "String objects in Java are immutable; any operation returns a new String."
        },
        {
          "type": "output",
          "question": "What does this code output?",
          "code": "String s = \"java\";\ns.toUpperCase();\nSystem.out.println(s);",
          "options": [
            "JAVA",
            "java",
            "null",
            "Compile error"
          ],
          "answer": 1,
          "explanation": "Because strings are immutable and the return value was not reassigned, s remains \"java\"."
        },
        {
          "type": "true-false",
          "question": "In Java, array indices are 0-based and array.length is a method call length().",
          "answer": false,
          "explanation": "Arrays have a public final field .length, not a method length()."
        }
      ]
    },
    "codingTask": {
      "id": "code-b6",
      "title": "B6: Marks Analyser",
      "prompt": "Given an array `int[] marks = {85, 92, 78, 90, 65};`\nWrite a program to compute:\n- Highest mark\n- Lowest mark\n- Average mark (as double)\nPrint:\n`Highest: 92\nLowest: 65\nAverage: 82.0`",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int[] marks = {85, 92, 78, 90, 65};\n        int min = marks[0];\n        int max = marks[0];\n        int sum = 0;\n        for (int m : marks) {\n            if (m < min) min = m;\n            if (m > max) max = m;\n            sum += m;\n        }\n        double avg = (double) sum / marks.length;\n        System.out.println(\"Highest: \" + max);\n        System.out.println(\"Lowest: \" + min);\n        System.out.println(\"Average: \" + avg);\n    }\n}",
      "expectedOutput": "Highest: 92\nLowest: 65\nAverage: 82.0",
      "testCases": [
        {
          "name": "Compute Array Stats",
          "expected": "Highest: 92\nLowest: 65\nAverage: 82.0"
        }
      ],
      "hints": [
        "Initialize min and max with marks[0].",
        "Cast sum to double when dividing by length."
      ]
    }
  },
  {
    "id": "b7",
    "code": "B7",
    "level": "beginner",
    "title": "OOP Foundations",
    "subtitle": "Classes, objects, constructors, this, encapsulation and static",
    "icon": "🏛️",
    "color": "#C084FC",
    "lessons": [
      {
        "id": "lesson-b7-1",
        "title": "Classes & Objects",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Blueprint & Instances",
            "content": "A class is a blueprint. An object is an instance created using `new`. Constructors initialize the object state."
          },
          {
            "type": "visual",
            "visual": "class-diagram",
            "visualData": {
              "classes": [
                {
                  "name": "Student",
                  "fields": [
                    "name: String",
                    "grade: int"
                  ],
                  "methods": [
                    "study()",
                    "getGrade()"
                  ]
                }
              ]
            },
            "title": "Class Diagram",
            "content": "Structure of fields and methods."
          },
          {
            "type": "code",
            "title": "Class with Constructor",
            "content": "Using this keyword to distinguish fields from parameters.",
            "code": "class Hero {\n    String name;\n    Hero(String name) { this.name = name; }\n    void shout() { System.out.println(name + \" is here!\"); }\n}"
          }
        ]
      },
      {
        "id": "lesson-b7-2",
        "title": "Encapsulation & Access Modifiers",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Encapsulation",
            "content": "Keep fields `private` and provide controlled access via `getters` and `setters`. This protects object integrity."
          },
          {
            "type": "code",
            "title": "Getters and Setters",
            "content": "Encapsulation example with validation.",
            "code": "class Account {\n    private double balance;\n    public double getBalance() { return balance; }\n    public void deposit(double amt) {\n        if (amt > 0) balance += amt;\n    }\n}"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-b7",
      "xp": 50,
      "questions": [
        {
          "type": "mcq",
          "question": "Which OOP concept hides internal state behind controlled methods?",
          "options": [
            "Encapsulation",
            "Compilation",
            "Iteration",
            "Casting"
          ],
          "answer": 0,
          "explanation": "Encapsulation protects internal fields by restricting direct access and exposing getters/setters."
        },
        {
          "type": "mcq",
          "question": "What does the new keyword generally do when creating an object?",
          "options": [
            "Deletes an object",
            "Creates an object in memory and calls constructor",
            "Imports a package",
            "Starts a thread"
          ],
          "answer": 1,
          "explanation": "new allocates memory on the heap and invokes the constructor."
        },
        {
          "type": "true-false",
          "question": "Static methods can directly access non-static instance variables without an object reference.",
          "answer": false,
          "explanation": "Static methods belong to the class and have no this reference; they cannot directly access instance fields."
        }
      ]
    },
    "codingTask": {
      "id": "code-b7",
      "title": "B7: BankAccount Class",
      "prompt": "Complete the `BankAccount` class with:\n- `private double balance;`\n- Constructor `BankAccount(double initial)`\n- `public void deposit(double amount)`\n- `public void withdraw(double amount)` (only if balance >= amount)\n- `public double getBalance()`\nIn `main`: start with 100, deposit 50, withdraw 30, and print `Balance: $120.0`",
      "starterCode": "class BankAccount {\n    private double balance;\n    public BankAccount(double initial) {\n        this.balance = initial;\n    }\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n    public void withdraw(double amount) {\n        if (amount > 0 && balance >= amount) balance -= amount;\n    }\n    public double getBalance() {\n        return balance;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(100.0);\n        acc.deposit(50.0);\n        acc.withdraw(30.0);\n        System.out.println(\"Balance: $\" + acc.getBalance());\n    }\n}",
      "expectedOutput": "Balance: $120.0",
      "testCases": [
        {
          "name": "Balance is $120.0",
          "expected": "Balance: $120.0"
        }
      ],
      "hints": [
        "Keep balance private.",
        "Deposit adds to balance; withdraw subtracts."
      ]
    }
  },
  {
    "id": "b8",
    "code": "B8",
    "level": "beginner",
    "title": "Exceptions & Collections Intro",
    "subtitle": "try/catch/finally, ArrayList, HashMap and HashSet",
    "icon": "🛡️",
    "color": "#E63946",
    "lessons": [
      {
        "id": "lesson-b8-1",
        "title": "Exception Handling",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Handling Errors Gracefully",
            "content": "Exceptions disrupt normal flow. Use `try-catch-finally` to prevent crashes and handle errors gracefully."
          },
          {
            "type": "code",
            "title": "Try-Catch-Finally",
            "content": "The finally block runs whether an exception occurred or not.",
            "code": "try {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"Cannot divide by zero!\");\n} finally {\n    System.out.println(\"Cleanup completed.\");\n}"
          }
        ]
      },
      {
        "id": "lesson-b8-2",
        "title": "ArrayList & HashMap Basics",
        "xp": 30,
        "slides": [
          {
            "type": "intro",
            "title": "Dynamic Data Structures",
            "content": "**ArrayList** grows dynamically. **HashMap** stores key-value pairs with fast lookups."
          },
          {
            "type": "code",
            "title": "ArrayList & HashMap in Action",
            "content": "Essential collection operations.",
            "code": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>();\n        list.add(\"Java\");\n        Map<String, Integer> map = new HashMap<>();\n        map.put(\"Java\", 21);\n        System.out.println(map.get(\"Java\"));\n    }\n}"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-b8",
      "xp": 50,
      "questions": [
        {
          "type": "mcq",
          "question": "Which collection stores key-value pairs in Java?",
          "options": [
            "ArrayList",
            "HashSet",
            "HashMap",
            "LinkedList"
          ],
          "answer": 2,
          "explanation": "HashMap stores key-value associations and allows fast retrieval by key."
        },
        {
          "type": "mcq",
          "question": "Which block is commonly used to catch and handle an exception?",
          "options": [
            "catch",
            "package",
            "import",
            "extends"
          ],
          "answer": 0,
          "explanation": "The catch block handles an exception matching its parameter type."
        },
        {
          "type": "true-false",
          "question": "The code inside a finally block is only executed if an exception is thrown in the try block.",
          "answer": false,
          "explanation": "A finally block executes regardless of whether an exception occurred or was handled."
        }
      ]
    },
    "codingTask": {
      "id": "code-b8",
      "title": "B8: Unique Names Counter",
      "prompt": "Given an array with duplicate names:\n`String[] names = {\"Alice\", \"Bob\", \"Alice\", \"Charlie\", \"Bob\"};`\nUse a `HashSet<String>` to collect unique names.\nPrint:\n`Total Unique: 3`",
      "starterCode": "import java.util.HashSet;\n\npublic class Main {\n    public static void main(String[] args) {\n        String[] names = {\"Alice\", \"Bob\", \"Alice\", \"Charlie\", \"Bob\"};\n        HashSet<String> unique = new HashSet<>();\n        for (String n : names) {\n            unique.add(n);\n        }\n        System.out.println(\"Total Unique: \" + unique.size());\n    }\n}",
      "expectedOutput": "Total Unique: 3",
      "testCases": [
        {
          "name": "Count Unique Names",
          "expected": "Total Unique: 3"
        }
      ],
      "hints": [
        "HashSet automatically discards duplicate entries.",
        "Use unique.size() to get count."
      ]
    }
  },
  {
    "id": "i1",
    "code": "I1",
    "level": "intermediate",
    "title": "OOP Beyond the Basics",
    "subtitle": "SOLID principles, composition, records and sealed classes",
    "icon": "💎",
    "color": "#9B59B6",
    "lessons": [
      {
        "id": "lesson-i1-1",
        "title": "SOLID & Composition",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Design Principles",
            "content": "SOLID guides robust design: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. Favor **composition over inheritance** for flexible architectures."
          },
          {
            "type": "code",
            "title": "Modern Java Records",
            "content": "Records (Java 16+) provide concise, immutable data carriers with auto-generated constructor, getters, equals, and hashCode.",
            "code": "public record User(String name, int age) {}\n// Usage:\nUser u = new User(\"Alice\", 25);\nSystem.out.println(u.name());"
          }
        ]
      },
      {
        "id": "lesson-i1-2",
        "title": "Sealed Types & Enums",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Exhaustive Hierarchies",
            "content": "`sealed` classes and interfaces restrict which classes can extend or implement them using `permits`. Enables compiler-checked pattern matching."
          },
          {
            "type": "code",
            "title": "Sealed Hierarchy",
            "content": "Example of sealed interface and permits.",
            "code": "public sealed interface Shape permits Circle, Square {}\nfinal class Circle implements Shape {}\nfinal class Square implements Shape {}"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-i1",
      "xp": 60,
      "questions": [
        {
          "type": "mcq",
          "question": "What is the primary benefit of Java Records?",
          "options": [
            "They make programs compile faster",
            "They provide concise, immutable data carrier classes",
            "They replace all regular classes",
            "They disable garbage collection"
          ],
          "answer": 1,
          "explanation": "Records are compact syntax for immutable data holders with automatic constructors, getters, and equals/hashCode."
        },
        {
          "type": "true-false",
          "question": "Composition means a class contains an instance of another class rather than extending it.",
          "answer": true,
          "explanation": "Composition (\"has-a\" relationship) gives greater flexibility than strict class inheritance (\"is-a\")."
        },
        {
          "type": "output",
          "question": "What does record accessor method output?",
          "code": "record Point(int x, int y) {}\nPoint p = new Point(3, 7);\nSystem.out.println(p.x() + p.y());",
          "options": [
            "10",
            "37",
            "Point[x=3,y=7]",
            "Compile error"
          ],
          "answer": 0,
          "explanation": "p.x() is 3 and p.y() is 7; 3 + 7 = 10."
        }
      ]
    },
    "codingTask": {
      "id": "code-i1",
      "title": "I1: Immutable Order Record",
      "prompt": "Define a Java Record `record Order(String id, double amount, boolean isDelivered) {}`\nIn `Main`, create an order with id `\"ORD-99\"`, amount `149.50`, delivered `true`.\nPrint: `Order ORD-99: $149.5 | Delivered: true`",
      "starterCode": "record Order(String id, double amount, boolean isDelivered) {}\n\npublic class Main {\n    public static void main(String[] args) {\n        Order o = new Order(\"ORD-99\", 149.50, true);\n        System.out.println(\"Order \" + o.id() + \": $\" + o.amount() + \" | Delivered: \" + o.isDelivered());\n    }\n}",
      "expectedOutput": "Order ORD-99: $149.5 | Delivered: true",
      "testCases": [
        {
          "name": "Print Record State",
          "expected": "Order ORD-99: $149.5 | Delivered: true"
        }
      ],
      "hints": [
        "Record field accessors use name() without \"get\" prefix.",
        "Use double 149.50."
      ]
    }
  },
  {
    "id": "i2",
    "code": "I2",
    "level": "intermediate",
    "title": "Collections & Generics",
    "subtitle": "List, Set, Queue, Map, Iterator, Comparator and type safety",
    "icon": "📚",
    "color": "#3498DB",
    "lessons": [
      {
        "id": "lesson-i2-1",
        "title": "Collection Hierarchy & Sets",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Collections Framework",
            "content": "Java Collections provide standardized architecture for representing and manipulating collections of objects. `Set` models a mathematical set with **no duplicates**."
          },
          {
            "type": "code",
            "title": "Set Uniqueness",
            "content": "HashSet vs TreeSet (sorted).",
            "code": "Set<String> set = new HashSet<>();\nset.add(\"A\");\nset.add(\"A\"); // Duplicate ignored\nSystem.out.println(set.size()); // prints 1"
          }
        ]
      },
      {
        "id": "lesson-i2-2",
        "title": "Generics & Type Safety",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Why Generics Matter",
            "content": "Generics (`<T>`) enable compile-time type checking, eliminating `ClassCastException` at runtime and removing the need for manual casting."
          },
          {
            "type": "code",
            "title": "Generic Method",
            "content": "Generic print method.",
            "code": "public static <T> void printItem(T item) {\n    System.out.println(\"Item: \" + item);\n}"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-i2",
      "xp": 60,
      "questions": [
        {
          "type": "mcq",
          "question": "Which collection interface does not allow duplicate elements?",
          "options": [
            "List",
            "Set",
            "Map",
            "Queue"
          ],
          "answer": 1,
          "explanation": "Set models a collection of unique elements and rejects duplicates."
        },
        {
          "type": "mcq",
          "question": "What is the main purpose of generics in Java?",
          "options": [
            "To run code faster in every case",
            "To enable compile-time type safety",
            "To replace classes",
            "To create database tables"
          ],
          "answer": 1,
          "explanation": "Generics allow types to be verified by the compiler, avoiding runtime ClassCastExceptions."
        },
        {
          "type": "true-false",
          "question": "TreeSet orders its elements naturally or using a supplied Comparator.",
          "answer": true,
          "explanation": "TreeSet uses a red-black tree to keep elements sorted in natural or comparator order."
        }
      ]
    },
    "codingTask": {
      "id": "code-i2",
      "title": "I2: Word Frequency Counter",
      "prompt": "Given: `String[] words = {\"apple\", \"banana\", \"apple\", \"cherry\", \"banana\", \"apple\"};`\nUse a `HashMap<String, Integer>` to count frequencies.\nPrint:\n`apple: 3\nbanana: 2\ncherry: 1`",
      "starterCode": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        String[] words = {\"apple\", \"banana\", \"apple\", \"cherry\", \"banana\", \"apple\"};\n        Map<String, Integer> freq = new LinkedHashMap<>();\n        for (String w : words) {\n            freq.put(w, freq.getOrDefault(w, 0) + 1);\n        }\n        for (Map.Entry<String, Integer> e : freq.entrySet()) {\n            System.out.println(e.getKey() + \": \" + e.getValue());\n        }\n    }\n}",
      "expectedOutput": "apple: 3\nbanana: 2\ncherry: 1",
      "testCases": [
        {
          "name": "Word Counts Match",
          "expected": "apple: 3\nbanana: 2\ncherry: 1"
        }
      ],
      "hints": [
        "Use LinkedHashMap to preserve insertion order.",
        "Use freq.getOrDefault(w, 0) + 1."
      ]
    }
  },
  {
    "id": "i3",
    "code": "I3",
    "level": "intermediate",
    "title": "Exceptions, Files & I/O",
    "subtitle": "Try-with-resources, Path, Files, buffered streams and CSV",
    "icon": "📂",
    "color": "#1ABC9C",
    "lessons": [
      {
        "id": "lesson-i3-1",
        "title": "Try-With-Resources",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Automatic Resource Management",
            "content": "Any resource implementing `java.lang.AutoCloseable` can be opened in `try(...)`. Java guarantees it will be closed automatically, preventing resource leaks!"
          },
          {
            "type": "code",
            "title": "Try-With-Resources Syntax",
            "content": "No finally block needed for closing streams.",
            "code": "import java.io.*;\ntry (BufferedReader br = new BufferedReader(new StringReader(\"Line 1\\nLine 2\"))) {\n    System.out.println(br.readLine());\n}"
          }
        ]
      },
      {
        "id": "lesson-i3-2",
        "title": "Modern Files API (java.nio.file)",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Path & Files",
            "content": "Modern Java uses `java.nio.file.Path` and `Files` class for efficient file operations, replacing older `java.io.File`."
          },
          {
            "type": "code",
            "title": "Files.readString / writeString",
            "content": "Quick reading and writing in Java 11+.",
            "code": "Path p = Path.of(\"notes.txt\");\n// Files.writeString(p, \"Java rocks!\");\n// String content = Files.readString(p);"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-i3",
      "xp": 60,
      "questions": [
        {
          "type": "mcq",
          "question": "Which mechanism ensures a resource is automatically closed after a try-with-resources block?",
          "options": [
            "final",
            "static",
            "Automatic resource management (AutoCloseable)",
            "synchronized"
          ],
          "answer": 2,
          "explanation": "The try-with-resources construct closes AutoCloseable resources automatically."
        },
        {
          "type": "true-false",
          "question": "Checked exceptions must be either caught or declared in the method signature with throws.",
          "answer": true,
          "explanation": "The Java compiler forces handling or declaration of checked exceptions."
        },
        {
          "type": "output",
          "question": "What does this safe parsing code output?",
          "code": "try {\n    int n = Integer.parseInt(\"abc\");\n} catch (NumberFormatException e) {\n    System.out.println(\"Invalid number\");\n}",
          "options": [
            "Invalid number",
            "abc",
            "0",
            "NullPointerException"
          ],
          "answer": 0,
          "explanation": "Integer.parseInt(\"abc\") throws NumberFormatException, caught by the catch block."
        }
      ]
    },
    "codingTask": {
      "id": "code-i3",
      "title": "I3: Safe Integer Parser",
      "prompt": "Write a static method `public static int parseSafe(String s, int fallback)`\nIf `s` is a valid integer, return it. If it throws `NumberFormatException`, return `fallback`.\nIn `main`, test with:\n`\"42\"` (fallback 0) -> print `42`\n`\"xyz\"` (fallback -1) -> print `-1`",
      "starterCode": "public class Main {\n    public static int parseSafe(String s, int fallback) {\n        try {\n            return Integer.parseInt(s);\n        } catch (NumberFormatException e) {\n            return fallback;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(parseSafe(\"42\", 0));\n        System.out.println(parseSafe(\"xyz\", -1));\n    }\n}",
      "expectedOutput": "42\n-1",
      "testCases": [
        {
          "name": "Parse Valid and Fallback",
          "expected": "42\n-1"
        }
      ],
      "hints": [
        "Wrap Integer.parseInt() in try-catch.",
        "Catch NumberFormatException and return fallback."
      ]
    }
  },
  {
    "id": "i4",
    "code": "I4",
    "level": "intermediate",
    "title": "Lambdas, Streams & Functional Java",
    "subtitle": "Stream pipeline: filter, map, sorted, reduce, collect and Optional",
    "icon": "🌊",
    "color": "#2ECC71",
    "lessons": [
      {
        "id": "lesson-i4-1",
        "title": "Functional Interfaces & Lambdas",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Passing Behavior as Data",
            "content": "A functional interface has exactly **one abstract method** (e.g. `Predicate<T>`, `Function<T,R>`, `Consumer<T>`). Lambda expressions provide concise implementations."
          },
          {
            "type": "code",
            "title": "Lambda Syntax",
            "content": "`parameter -> expression`",
            "code": "List<String> names = List.of(\"Java\", \"Kotlin\", \"Scala\");\nnames.forEach(n -> System.out.println(n));"
          }
        ]
      },
      {
        "id": "lesson-i4-2",
        "title": "The Stream API Pipeline",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Declarative Data Processing",
            "content": "Streams allow functional transformations: `source -> intermediate operations (filter, map, sorted) -> terminal operation (collect, reduce, count)`."
          },
          {
            "type": "code",
            "title": "Filter and Map",
            "content": "Stream transformation example.",
            "code": "List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);\nList<Integer> evens = nums.stream()\n    .filter(n -> n % 2 == 0)\n    .map(n -> n * 10)\n    .toList();\nSystem.out.println(evens); // [20, 40, 60]"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-i4",
      "xp": 60,
      "questions": [
        {
          "type": "mcq",
          "question": "What does Stream.filter() do in a stream pipeline?",
          "options": [
            "Transforms each element",
            "Keeps elements matching a predicate",
            "Sorts elements in memory",
            "Writes elements to disk"
          ],
          "answer": 1,
          "explanation": "Stream.filter retains only elements for which the predicate returns true."
        },
        {
          "type": "mcq",
          "question": "What is a lambda expression commonly used to provide?",
          "options": [
            "A package declaration",
            "An implementation of a functional interface",
            "A database connection",
            "A class loader"
          ],
          "answer": 1,
          "explanation": "Lambdas provide the single abstract method implementation of a functional interface."
        },
        {
          "type": "output",
          "question": "What does this stream pipeline output?",
          "code": "List<String> list = List.of(\"cat\", \"elephant\", \"dog\");\nlong count = list.stream().filter(s -> s.length() == 3).count();\nSystem.out.println(count);",
          "options": [
            "2",
            "3",
            "1",
            "0"
          ],
          "answer": 0,
          "explanation": "\"cat\" and \"dog\" have length 3, so count is 2."
        }
      ]
    },
    "codingTask": {
      "id": "code-i4",
      "title": "I4: Stream Square Evens",
      "prompt": "Given: `List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);`\nUsing the Stream API:\n1. Filter only even numbers (`n % 2 == 0`)\n2. Map each even number to its square (`n * n`)\n3. Print each result on a new line\nOutput should be:\n`4\n16\n36`",
      "starterCode": "import java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);\n        numbers.stream()\n            .filter(n -> n % 2 == 0)\n            .map(n -> n * n)\n            .forEach(System.out::println);\n    }\n}",
      "expectedOutput": "4\n16\n36",
      "testCases": [
        {
          "name": "Filter and Square Evens",
          "expected": "4\n16\n36"
        }
      ],
      "hints": [
        "Use .filter(n -> n % 2 == 0)",
        "Use .map(n -> n * n)",
        "Use .forEach(System.out::println)"
      ]
    }
  },
  {
    "id": "i5",
    "code": "I5",
    "level": "intermediate",
    "title": "Date/Time, Regex & Useful APIs",
    "subtitle": "java.time, LocalDate, Duration, Pattern/Matcher, BigDecimal",
    "icon": "⏱️",
    "color": "#E67E22",
    "lessons": [
      {
        "id": "lesson-i5-1",
        "title": "Modern Date & Time (java.time)",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Goodbye Old java.util.Date",
            "content": "Modern Java includes `LocalDate`, `LocalDateTime`, `Duration`, and `Period`. They are thread-safe and immutable!"
          },
          {
            "type": "code",
            "title": "LocalDate Operations",
            "content": "Date manipulation with java.time.",
            "code": "import java.time.LocalDate;\nLocalDate today = LocalDate.of(2026, 11, 4);\nLocalDate nextWeek = today.plusDays(7);\nSystem.out.println(nextWeek);"
          }
        ]
      },
      {
        "id": "lesson-i5-2",
        "title": "Regular Expressions & BigDecimal",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Regex & Financial Math",
            "content": "Use `Pattern` and `Matcher` for text validation. Always use **`BigDecimal`** for financial calculations to avoid floating-point inaccuracies!"
          },
          {
            "type": "code",
            "title": "BigDecimal Precision",
            "content": "Precise financial math.",
            "code": "import java.math.BigDecimal;\nBigDecimal price = new BigDecimal(\"19.99\");\nBigDecimal tax = new BigDecimal(\"1.08\");\nSystem.out.println(price.multiply(tax));"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-i5",
      "xp": 60,
      "questions": [
        {
          "type": "true-false",
          "question": "Double and float primitive types should be used for precise financial and currency calculations.",
          "answer": false,
          "explanation": "Double and float have binary rounding errors. Always use BigDecimal for money."
        },
        {
          "type": "mcq",
          "question": "Which class in java.time represents a date without time or timezone?",
          "options": [
            "LocalDateTime",
            "LocalDate",
            "Instant",
            "ZonedDateTime"
          ],
          "answer": 1,
          "explanation": "LocalDate represents date only (year, month, day)."
        },
        {
          "type": "output",
          "question": "What does regex matches check?",
          "code": "String zip = \"94043\";\nSystem.out.println(zip.matches(\"\\\\d{5}\"));",
          "options": [
            "true",
            "false",
            "null",
            "Error"
          ],
          "answer": 0,
          "explanation": "\\d{5} matches exactly 5 numeric digits, so it returns true."
        }
      ]
    },
    "codingTask": {
      "id": "code-i5",
      "title": "I5: Simple Email Validator",
      "prompt": "Write a method `public static boolean isValidEmail(String email)`\nUse regex to check that email contains characters, followed by `@`, followed by domain name, a dot, and extension (e.g. `^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]+$`)\nIn main, validate `\"hero@javaquest.com\"` and `\"invalid-email\"` and print:\n`hero@javaquest.com: true\ninvalid-email: false`",
      "starterCode": "public class Main {\n    public static boolean isValidEmail(String email) {\n        return email != null && email.matches(\"^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]+$\");\n    }\n    public static void main(String[] args) {\n        System.out.println(\"hero@javaquest.com: \" + isValidEmail(\"hero@javaquest.com\"));\n        System.out.println(\"invalid-email: \" + isValidEmail(\"invalid-email\"));\n    }\n}",
      "expectedOutput": "hero@javaquest.com: true\ninvalid-email: false",
      "testCases": [
        {
          "name": "Validate Valid and Invalid Emails",
          "expected": "hero@javaquest.com: true\ninvalid-email: false"
        }
      ],
      "hints": [
        "Use String.matches() with regex pattern."
      ]
    }
  },
  {
    "id": "i6",
    "code": "I6",
    "level": "intermediate",
    "title": "Testing & Debugging",
    "subtitle": "JUnit 5 basics, assertions, test lifecycle and edge cases",
    "icon": "🧪",
    "color": "#16A085",
    "lessons": [
      {
        "id": "lesson-i6-1",
        "title": "Unit Testing with JUnit 5",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Automated Testing",
            "content": "Unit tests prove individual units of code work as expected. JUnit 5 uses `@Test`, `@BeforeEach`, and assertions like `assertEquals()`."
          },
          {
            "type": "code",
            "title": "JUnit 5 Anatomy",
            "content": "Testing expected behavior.",
            "code": "import org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass CalculatorTest {\n    @Test\n    void testAdd() {\n        assertEquals(5, 2 + 3);\n    }\n}"
          }
        ]
      },
      {
        "id": "lesson-i6-2",
        "title": "Debugging Techniques",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Finding Bugs Systematically",
            "content": "Learn to read stack traces from bottom to top, set conditional breakpoints in your IDE, and test boundary edge cases (0, empty, null, max)."
          },
          {
            "type": "code",
            "title": "Testing Exceptions",
            "content": "Asserting that an exception is thrown.",
            "code": "assertThrows(IllegalArgumentException.class, () -> {\n    throw new IllegalArgumentException(\"Invalid\");\n});"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-i6",
      "xp": 60,
      "questions": [
        {
          "type": "mcq",
          "question": "Which JUnit assertion checks that two values are equal?",
          "options": [
            "assertEquals",
            "assertThrows",
            "assertNull",
            "failOnly"
          ],
          "answer": 0,
          "explanation": "assertEquals compares expected and actual values."
        },
        {
          "type": "true-false",
          "question": "Edge cases such as 0, null, empty lists, and negative numbers should be tested.",
          "answer": true,
          "explanation": "Most production bugs happen at boundaries and edge cases."
        },
        {
          "type": "output",
          "question": "What happens in a unit test if assertEquals(5, 2 + 2) executes?",
          "options": [
            "Test fails with AssertionError",
            "Test passes",
            "Java compiler error",
            "JVM exits"
          ],
          "answer": 0,
          "explanation": "Expected was 5 but actual was 4, causing the test assertion to fail."
        }
      ]
    },
    "codingTask": {
      "id": "code-i6",
      "title": "I6: Unit Test Simulator",
      "prompt": "Write a small test runner that verifies `add(a, b)`:\nIf `add(2, 3) == 5`, print `TEST 1: PASS`\nIf `add(-1, 1) == 0`, print `TEST 2: PASS`\nIf all pass, print `ALL TESTS PASSED`",
      "starterCode": "public class Main {\n    static int add(int a, int b) { return a + b; }\n    public static void main(String[] args) {\n        boolean t1 = add(2, 3) == 5;\n        boolean t2 = add(-1, 1) == 0;\n        System.out.println(\"TEST 1: \" + (t1 ? \"PASS\" : \"FAIL\"));\n        System.out.println(\"TEST 2: \" + (t2 ? \"PASS\" : \"FAIL\"));\n        if (t1 && t2) System.out.println(\"ALL TESTS PASSED\");\n    }\n}",
      "expectedOutput": "TEST 1: PASS\nTEST 2: PASS\nALL TESTS PASSED",
      "testCases": [
        {
          "name": "Simulate Automated Tests",
          "expected": "ALL TESTS PASSED"
        }
      ],
      "hints": [
        "Check both test conditions."
      ]
    }
  },
  {
    "id": "i7",
    "code": "I7",
    "level": "intermediate",
    "title": "Database Programming with JDBC",
    "subtitle": "SQL basics, PreparedStatement, ResultSet and transactions",
    "icon": "🗄️",
    "color": "#27AE60",
    "lessons": [
      {
        "id": "lesson-i7-1",
        "title": "JDBC & PreparedStatement",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Connecting Java to Databases",
            "content": "Java Database Connectivity (JDBC) standardizes database operations. Always use **`PreparedStatement`** to bind parameters and prevent catastrophic SQL Injection!"
          },
          {
            "type": "code",
            "title": "Safe PreparedStatement",
            "content": "Parameter binding with placeholder `?`.",
            "code": "String sql = \"SELECT * FROM users WHERE email = ?\";\nPreparedStatement ps = conn.prepareStatement(sql);\nps.setString(1, \"alice@example.com\");\nResultSet rs = ps.executeQuery();"
          }
        ]
      },
      {
        "id": "lesson-i7-2",
        "title": "Transactions & ACID",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Commit & Rollback",
            "content": "Disable `conn.setAutoCommit(false)` to group multiple queries into an atomic transaction. Call `conn.commit()` on success, or `conn.rollback()` on failure."
          },
          {
            "type": "code",
            "title": "Transaction Template",
            "content": "Safe transaction handling pattern.",
            "code": "try {\n    conn.setAutoCommit(false);\n    // execute queries\n    conn.commit();\n} catch (Exception e) {\n    conn.rollback();\n}"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-i7",
      "xp": 60,
      "questions": [
        {
          "type": "mcq",
          "question": "Which JDBC object is preferred for parameterised SQL queries?",
          "options": [
            "Statement only",
            "PreparedStatement",
            "ResultSet",
            "DriverManager"
          ],
          "answer": 1,
          "explanation": "PreparedStatement compiles the SQL structure separately from parameter values, eliminating SQL injection."
        },
        {
          "type": "mcq",
          "question": "Why should SQL values always be parameterised instead of string concatenated?",
          "options": [
            "To change Java syntax",
            "To reduce SQL injection risk",
            "To remove database indexes",
            "To avoid transactions"
          ],
          "answer": 1,
          "explanation": "Bound parameters ensure user input is treated strictly as data, never as executable SQL commands."
        },
        {
          "type": "true-false",
          "question": "A database transaction ensures that either all operations succeed or all are rolled back.",
          "answer": true,
          "explanation": "Atomicity in ACID transactions guarantees all-or-nothing execution."
        }
      ]
    },
    "codingTask": {
      "id": "code-i7",
      "title": "I7: Parameterized SQL Query Builder",
      "prompt": "Implement a helper method `public static String buildUserQuery(String table, String column)`\nIt should return: `SELECT * FROM ` + table + ` WHERE ` + column + ` = ?`\nIn main, call with `\"accounts\"` and `\"user_id\"`, and print the query string.",
      "starterCode": "public class Main {\n    public static String buildUserQuery(String table, String column) {\n        return \"SELECT * FROM \" + table + \" WHERE \" + column + \" = ?\";\n    }\n    public static void main(String[] args) {\n        String q = buildUserQuery(\"accounts\", \"user_id\");\n        System.out.println(q);\n    }\n}",
      "expectedOutput": "SELECT * FROM accounts WHERE user_id = ?",
      "testCases": [
        {
          "name": "Build Parameterized Query",
          "expected": "SELECT * FROM accounts WHERE user_id = ?"
        }
      ],
      "hints": [
        "Notice the question mark ? placeholder at the end."
      ]
    }
  },
  {
    "id": "i8",
    "code": "I8",
    "level": "intermediate",
    "title": "Concurrency Foundations & Tooling",
    "subtitle": "Thread, Runnable, ExecutorService, Maven build tools, Git",
    "icon": "⚙️",
    "color": "#2980B9",
    "lessons": [
      {
        "id": "lesson-i8-1",
        "title": "Threads & ExecutorService",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Asynchronous Execution",
            "content": "A Thread is an independent path of execution. Modern Java prefers `ExecutorService` (thread pools) over creating raw `new Thread()` manually."
          },
          {
            "type": "code",
            "title": "ExecutorService Pattern",
            "content": "Submitting tasks to a thread pool.",
            "code": "import java.util.concurrent.*;\nExecutorService pool = Executors.newFixedThreadPool(2);\npool.submit(() -> System.out.println(\"Running async!\"));\npool.shutdown();"
          }
        ]
      },
      {
        "id": "lesson-i8-2",
        "title": "Build Tools & Git Lifecycle",
        "xp": 40,
        "slides": [
          {
            "type": "intro",
            "title": "Maven & Gradle",
            "content": "Build tools manage project dependencies, compile code, run tests, and package JARs (`mvn clean install`). Git tracks versions and enables collaboration."
          },
          {
            "type": "code",
            "title": "Maven pom.xml Dependency",
            "content": "Adding external libraries declarative.",
            "code": "<dependency>\n    <groupId>org.junit.jupiter</groupId>\n    <artifactId>junit-jupiter</artifactId>\n    <version>5.10.0</version>\n    <scope>test</scope>\n</dependency>"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-i8",
      "xp": 60,
      "questions": [
        {
          "type": "mcq",
          "question": "What does ExecutorService help manage in Java?",
          "options": [
            "HTML pages",
            "A pool or execution of asynchronous tasks",
            "SQL schemas",
            "Java imports"
          ],
          "answer": 1,
          "explanation": "ExecutorService manages task queuing and execution across worker threads."
        },
        {
          "type": "mcq",
          "question": "Which tool is commonly used to define and manage Java project builds and dependencies?",
          "options": [
            "Maven",
            "Paint",
            "Wireshark",
            "Figma"
          ],
          "answer": 0,
          "explanation": "Maven (along with Gradle) is the industry standard build and dependency manager for Java."
        },
        {
          "type": "true-false",
          "question": "A race condition occurs when concurrent operations produce unpredictable results depending on execution timing.",
          "answer": true,
          "explanation": "Unsynchronized access to shared mutable state leads to race conditions."
        }
      ]
    },
    "codingTask": {
      "id": "code-i8",
      "title": "I8: Asynchronous Task Runner",
      "prompt": "Write a program using `ExecutorService` with 1 thread:\nSubmit a Runnable task that prints `Async Task Completed!`\nCall `pool.shutdown()` and `pool.awaitTermination(1, TimeUnit.SECONDS);`\nIn main after termination, print `All Done!`",
      "starterCode": "import java.util.concurrent.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        ExecutorService pool = Executors.newSingleThreadExecutor();\n        pool.submit(() -> {\n            System.out.println(\"Async Task Completed!\");\n        });\n        pool.shutdown();\n        pool.awaitTermination(2, TimeUnit.SECONDS);\n        System.out.println(\"All Done!\");\n    }\n}",
      "expectedOutput": "Async Task Completed!\nAll Done!",
      "testCases": [
        {
          "name": "Run Async and Complete",
          "expected": "Async Task Completed!\nAll Done!"
        }
      ],
      "hints": [
        "Submit task, shutdown pool, and await termination."
      ]
    }
  },
  {
    "id": "a1",
    "code": "A1",
    "level": "advanced",
    "title": "JVM & Memory Model",
    "subtitle": "Class loading, JIT compilation, Heap, Stack, Metaspace and GC",
    "icon": "🧠",
    "color": "#8E44AD",
    "lessons": [
      {
        "id": "lesson-a1-1",
        "title": "JVM Memory Architecture",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "Inside the JVM",
            "content": "JVM memory is divided into: **Heap** (objects & instances), **Stack** (thread execution & local frames), and **Metaspace** (class metadata). Objects allocated at runtime live on the Heap."
          },
          {
            "type": "code",
            "title": "Understanding Garbage Collection",
            "content": "Garbage collectors (G1, ZGC) reclaim unreachable objects on the heap automatically.",
            "code": "// Objects with no live references become eligible for GC:\nObject obj = new Object();\nobj = null; // eligible for GC"
          }
        ]
      },
      {
        "id": "lesson-a1-2",
        "title": "JIT Compilation & Bytecode",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "HotSpot & JIT",
            "content": "The **Just-In-Time (JIT)** compiler monitors execution (\"hot spots\") and compiles frequently executed bytecode directly into native machine code for maximum performance."
          },
          {
            "type": "code",
            "title": "Inspecting Bytecode with javap",
            "content": "Run `javap -c Main` in terminal to view the bytecode instructions generated by javac.",
            "code": "// Bytecode instructions: aload_0, invokespecial, getstatic, etc."
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-a1",
      "xp": 75,
      "questions": [
        {
          "type": "mcq",
          "question": "Which JVM memory area is primarily used for objects allocated at runtime?",
          "options": [
            "Heap",
            "Java source folder",
            "Classpath text file",
            "CPU register file"
          ],
          "answer": 0,
          "explanation": "Objects are allocated on the Heap, where their lifecycle is managed by garbage collection."
        },
        {
          "type": "mcq",
          "question": "What does the JIT (Just-In-Time) compiler do in the JVM?",
          "options": [
            "Converts bytecode to native machine code for hot code paths",
            "Writes Java source files",
            "Creates SQL indexes",
            "Replaces garbage collection"
          ],
          "answer": 0,
          "explanation": "The JIT compiles frequently executed bytecode directly into native machine instructions at runtime."
        },
        {
          "type": "true-false",
          "question": "Local primitive variables inside a method are stored in stack memory frames.",
          "answer": true,
          "explanation": "Local primitive variables and method call states reside on the thread stack."
        }
      ]
    },
    "codingTask": {
      "id": "code-a1",
      "title": "A1: Runtime Memory Inspector",
      "prompt": "Write a program that uses `Runtime.getRuntime()` to query the JVM:\n1. Check `Runtime.getRuntime().totalMemory() > 0`\n2. Check `Runtime.getRuntime().freeMemory() > 0`\n3. Print: `JVM Memory: ACTIVE`",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        Runtime rt = Runtime.getRuntime();\n        if (rt.totalMemory() > 0 && rt.freeMemory() > 0) {\n            System.out.println(\"JVM Memory: ACTIVE\");\n        }\n    }\n}",
      "expectedOutput": "JVM Memory: ACTIVE",
      "testCases": [
        {
          "name": "Inspect JVM Runtime",
          "expected": "JVM Memory: ACTIVE"
        }
      ],
      "hints": [
        "Use Runtime.getRuntime().totalMemory()."
      ]
    }
  },
  {
    "id": "a2",
    "code": "A2",
    "level": "advanced",
    "title": "Advanced Concurrency",
    "subtitle": "Java Memory Model, happens-before, locks, atomics and virtual threads",
    "icon": "⚡",
    "color": "#D35400",
    "lessons": [
      {
        "id": "lesson-a2-1",
        "title": "Java Memory Model & Happens-Before",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "The JMM Contract",
            "content": "The **Java Memory Model (JMM)** defines how threads interact through memory. The **happens-before** relationship guarantees ordering and visibility of memory writes across threads."
          },
          {
            "type": "code",
            "title": "Volatile & Atomics",
            "content": "`volatile` guarantees read/write visibility. Atomics (like `AtomicInteger`) guarantee lock-free atomic operations.",
            "code": "import java.util.concurrent.atomic.AtomicInteger;\nAtomicInteger counter = new AtomicInteger(0);\ncounter.incrementAndGet(); // thread-safe without synchronized"
          }
        ]
      },
      {
        "id": "lesson-a2-2",
        "title": "Virtual Threads (Java 21+)",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "Project Loom & Virtual Threads",
            "content": "Virtual threads are lightweight threads managed by the JVM rather than the OS. You can spawn millions of virtual threads with near-zero overhead!"
          },
          {
            "type": "code",
            "title": "Launching Virtual Threads",
            "content": "Using Thread.ofVirtual() in Java 21.",
            "code": "Thread.ofVirtual().start(() -> {\n    System.out.println(\"Running on a lightweight virtual thread!\");\n});"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-a2",
      "xp": 75,
      "questions": [
        {
          "type": "mcq",
          "question": "What is a race condition?",
          "options": [
            "A compiler warning",
            "A result that depends on unpredictable timing of concurrent operations",
            "A database backup",
            "A type of loop"
          ],
          "answer": 1,
          "explanation": "Race conditions occur when multiple threads access shared state without synchronization, yielding timing-dependent bugs."
        },
        {
          "type": "mcq",
          "question": "What does the happens-before relationship help establish in the JMM?",
          "options": [
            "A guaranteed ordering and visibility relationship between actions",
            "A faster network connection",
            "A class inheritance tree",
            "A database schema"
          ],
          "answer": 0,
          "explanation": "The JMM uses happens-before to guarantee that memory writes by one thread are visible to another."
        },
        {
          "type": "true-false",
          "question": "Virtual threads introduced in Java 21 have a 1:1 mapping to operating system kernel threads.",
          "answer": false,
          "explanation": "Virtual threads are M:N user-mode threads managed by the JVM, multiplexed over a small pool of carrier OS threads."
        }
      ]
    },
    "codingTask": {
      "id": "code-a2",
      "title": "A2: Lock-Free Atomic Counter",
      "prompt": "Use `AtomicInteger` to increment a counter 1000 times across 2 parallel tasks in `CompletableFuture`.\nThen print: `Atomic Count: 1000`",
      "starterCode": "import java.util.concurrent.atomic.AtomicInteger;\nimport java.util.concurrent.CompletableFuture;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        AtomicInteger counter = new AtomicInteger(0);\n        CompletableFuture<Void> cf1 = CompletableFuture.runAsync(() -> {\n            for (int i = 0; i < 500; i++) counter.incrementAndGet();\n        });\n        CompletableFuture<Void> cf2 = CompletableFuture.runAsync(() -> {\n            for (int i = 0; i < 500; i++) counter.incrementAndGet();\n        });\n        CompletableFuture.allOf(cf1, cf2).join();\n        System.out.println(\"Atomic Count: \" + counter.get());\n    }\n}",
      "expectedOutput": "Atomic Count: 1000",
      "testCases": [
        {
          "name": "Atomic Counter Sums to 1000",
          "expected": "Atomic Count: 1000"
        }
      ],
      "hints": [
        "Use AtomicInteger.incrementAndGet()."
      ]
    }
  },
  {
    "id": "a3",
    "code": "A3",
    "level": "advanced",
    "title": "Advanced Language Features",
    "subtitle": "Generics in depth, type erasure, annotations, reflection, pattern matching",
    "icon": "🧬",
    "color": "#9B59B6",
    "lessons": [
      {
        "id": "lesson-a3-1",
        "title": "Pattern Matching & Modern Switch",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "Type Patterns in Switch",
            "content": "Modern Java lets you switch directly on object types with pattern matching, casting automatically!"
          },
          {
            "type": "code",
            "title": "Pattern Matching Example",
            "content": "Clean polymorphic handling without instanceof chains.",
            "code": "Object obj = \"Hello Java 21\";\nif (obj instanceof String s) {\n    System.out.println(s.toUpperCase());\n}"
          }
        ]
      },
      {
        "id": "lesson-a3-2",
        "title": "Annotations & Type Erasure",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "Type Erasure",
            "content": "Java generics exist at compile-time for type safety, but the compiler erases generic type parameters in bytecode (replacing them with `Object` or bounds) for backward compatibility."
          },
          {
            "type": "code",
            "title": "Custom Annotation",
            "content": "Defining annotations with retention policy.",
            "code": "@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.METHOD)\npublic @interface Endpoint {\n    String path();\n}"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-a3",
      "xp": 75,
      "questions": [
        {
          "type": "true-false",
          "question": "At runtime, List<String> and List<Integer> have their generic type parameters erased by the compiler.",
          "answer": true,
          "explanation": "Type erasure removes generic arguments at compile time for backward compatibility."
        },
        {
          "type": "output",
          "question": "What does pattern matching instanceof do?",
          "code": "Object val = 100;\nif (val instanceof Integer i) {\n    System.out.println(i + 25);\n}",
          "options": [
            "125",
            "10025",
            "Compile error",
            "ClassCastException"
          ],
          "answer": 0,
          "explanation": "Pattern matching automatically checks type and binds variable i as Integer: 100 + 25 = 125."
        },
        {
          "type": "mcq",
          "question": "Which annotation retention policy keeps the annotation available for runtime reflection?",
          "options": [
            "SOURCE",
            "CLASS",
            "RUNTIME",
            "SYSTEM"
          ],
          "answer": 2,
          "explanation": "RetentionPolicy.RUNTIME keeps annotations in the compiled class file and accessible via reflection."
        }
      ]
    },
    "codingTask": {
      "id": "code-a3",
      "title": "A3: Pattern Matching Evaluator",
      "prompt": "Write a static method `public static String describe(Object obj)` that uses pattern matching:\n- If `obj instanceof String s` -> return `\"String: \" + s.toUpperCase()`\n- If `obj instanceof Integer i` -> return `\"Integer: \" + (i * 2)`\n- Else -> return `\"Unknown\"`\nIn main, print `describe(\"java\")` and `describe(50)`:\n`String: JAVA\nInteger: 100`",
      "starterCode": "public class Main {\n    public static String describe(Object obj) {\n        if (obj instanceof String s) return \"String: \" + s.toUpperCase();\n        if (obj instanceof Integer i) return \"Integer: \" + (i * 2);\n        return \"Unknown\";\n    }\n    public static void main(String[] args) {\n        System.out.println(describe(\"java\"));\n        System.out.println(describe(50));\n    }\n}",
      "expectedOutput": "String: JAVA\nInteger: 100",
      "testCases": [
        {
          "name": "Evaluate Pattern Matching Types",
          "expected": "String: JAVA\nInteger: 100"
        }
      ],
      "hints": [
        "Use pattern matching instanceof (obj instanceof String s)."
      ]
    }
  },
  {
    "id": "a4",
    "code": "A4",
    "level": "advanced",
    "title": "Design & Architecture",
    "subtitle": "Builder, Factory, Strategy, Observer and Clean Architecture",
    "icon": "🏛️",
    "color": "#16A085",
    "lessons": [
      {
        "id": "lesson-a4-1",
        "title": "Creational Patterns: Builder & Factory",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "The Builder Pattern",
            "content": "Solves the \"telescoping constructor\" anti-pattern when objects have many optional parameters. Produces readable, immutable objects step-by-step."
          },
          {
            "type": "code",
            "title": "Builder Pattern",
            "content": "Fluent method chaining pattern.",
            "code": "User u = new User.Builder(\"Alex\")\n    .email(\"alex@code.com\")\n    .role(\"ADMIN\")\n    .build();"
          }
        ]
      },
      {
        "id": "lesson-a4-2",
        "title": "Behavioral Patterns: Strategy & Observer",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "Strategy & Clean Architecture",
            "content": "The **Strategy Pattern** defines a family of interchangeable algorithms (e.g. payment processors). Hexagonal architecture decouples core business logic from frameworks and databases."
          },
          {
            "type": "code",
            "title": "Strategy with Functional Interface",
            "content": "In modern Java, Strategy is simply a lambda or method reference!",
            "code": "Function<Double, Double> discountStrategy = price -> price * 0.9;"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-a4",
      "xp": 75,
      "questions": [
        {
          "type": "mcq",
          "question": "Which design pattern is best suited for constructing complex objects with many optional parameters?",
          "options": [
            "Singleton",
            "Builder",
            "Adapter",
            "Proxy"
          ],
          "answer": 1,
          "explanation": "The Builder pattern allows step-by-step object construction with readable fluent methods."
        },
        {
          "type": "true-false",
          "question": "In Hexagonal Architecture, core business domain logic depends directly on database drivers and web frameworks.",
          "answer": false,
          "explanation": "Hexagonal architecture inverts dependencies: core domain is isolated and has zero dependencies on external frameworks."
        },
        {
          "type": "output",
          "question": "What does fluent method chaining in a builder return?",
          "options": [
            "The builder instance itself (this)",
            "void",
            "null",
            "A new JVM thread"
          ],
          "answer": 0,
          "explanation": "Builder methods return this to allow chaining: .setA().setB().build()."
        }
      ]
    },
    "codingTask": {
      "id": "code-a4",
      "title": "A4: Fluent Builder Pattern",
      "prompt": "Implement a `HttpRequest` class with a static `Builder`:\nFields: `url`, `method` (defaults to \"GET\"), `timeoutMs` (defaults to 3000).\nInclude fluent methods: `.url(...)`, `.method(...)`, `.timeout(...)`, `.build()`\nIn main, construct and print:\n`HttpRequest[url=https://api.javaquest.com, method=POST, timeoutMs=5000]`",
      "starterCode": "class HttpRequest {\n    final String url;\n    final String method;\n    final int timeoutMs;\n    private HttpRequest(Builder b) {\n        this.url = b.url;\n        this.method = b.method;\n        this.timeoutMs = b.timeoutMs;\n    }\n    public static class Builder {\n        String url;\n        String method = \"GET\";\n        int timeoutMs = 3000;\n        public Builder url(String u) { this.url = u; return this; }\n        public Builder method(String m) { this.method = m; return this; }\n        public Builder timeout(int t) { this.timeoutMs = t; return this; }\n        public HttpRequest build() { return new HttpRequest(this); }\n    }\n    public String toString() {\n        return \"HttpRequest[url=\" + url + \", method=\" + method + \", timeoutMs=\" + timeoutMs + \"]\";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        HttpRequest req = new HttpRequest.Builder()\n            .url(\"https://api.javaquest.com\")\n            .method(\"POST\")\n            .timeout(5000)\n            .build();\n        System.out.println(req);\n    }\n}",
      "expectedOutput": "HttpRequest[url=https://api.javaquest.com, method=POST, timeoutMs=5000]",
      "testCases": [
        {
          "name": "Build Request Object",
          "expected": "HttpRequest[url=https://api.javaquest.com, method=POST, timeoutMs=5000]"
        }
      ],
      "hints": [
        "Each builder method sets field and returns this.",
        "build() instantiates HttpRequest."
      ]
    }
  },
  {
    "id": "a5",
    "code": "A5",
    "level": "advanced",
    "title": "Networking, Security & Reliability",
    "subtitle": "HTTP/REST, password hashing, TLS, timeouts and idempotency",
    "icon": "🔒",
    "color": "#C0392B",
    "lessons": [
      {
        "id": "lesson-a5-1",
        "title": "Application Security & Secrets",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "Defensive Engineering",
            "content": "Never store plaintext passwords! Always use salted, adaptive hashing algorithms (Argon2, BCrypt). Never hardcode API secrets in source control."
          },
          {
            "type": "code",
            "title": "Java 11+ HttpClient",
            "content": "Modern non-blocking HTTP client.",
            "code": "HttpClient client = HttpClient.newHttpClient();\nHttpRequest req = HttpRequest.newBuilder()\n    .uri(URI.create(\"https://api.example.com\"))\n    .GET()\n    .build();"
          }
        ]
      },
      {
        "id": "lesson-a5-2",
        "title": "Reliability: Idempotency & Retries",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "Idempotency in Distributed Systems",
            "content": "An operation is **idempotent** if applying it multiple times produces the exact same state as applying it once (e.g. HTTP GET, PUT, DELETE). Critical for retry resilience."
          },
          {
            "type": "code",
            "title": "Exponential Backoff Pattern",
            "content": "Retrying transient errors with increasing delay.",
            "code": "// waitTime = baseDelay * (2 ^ attemptCount)"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-a5",
      "xp": 75,
      "questions": [
        {
          "type": "mcq",
          "question": "Which practice is safest for storing user passwords in a database?",
          "options": [
            "Store plaintext",
            "Encrypt with a reversible key only",
            "Use a dedicated password-hashing algorithm with salt",
            "Base64 encode"
          ],
          "answer": 2,
          "explanation": "Passwords should be stored using salted, adaptive one-way hashes (e.g. BCrypt, PBKDF2, Argon2)."
        },
        {
          "type": "mcq",
          "question": "What is idempotency in an API operation?",
          "options": [
            "Repeating the same request has the same intended effect as doing it once",
            "Every request creates a new resource",
            "The request has no response",
            "The endpoint never fails"
          ],
          "answer": 0,
          "explanation": "Idempotent requests can be safely repeated without creating unintended duplicate state."
        },
        {
          "type": "true-false",
          "question": "HTTPS encrypts data in transit between client and server using TLS.",
          "answer": true,
          "explanation": "TLS guarantees confidentiality and integrity of transmitted data over the network."
        }
      ]
    },
    "codingTask": {
      "id": "code-a5",
      "title": "A5: Exponential Backoff Calculator",
      "prompt": "Implement a helper `public static int getBackoffDelay(int attempt, int baseMs, int maxMs)`\nFormula: `int delay = baseMs * (1 << (attempt - 1));` capped at `maxMs`.\nIn main, print delays for attempts 1, 2, 3 with base 100ms and max 1000ms:\n`Attempt 1: 100ms\nAttempt 2: 200ms\nAttempt 3: 400ms`",
      "starterCode": "public class Main {\n    public static int getBackoffDelay(int attempt, int baseMs, int maxMs) {\n        int delay = baseMs * (1 << (attempt - 1));\n        return Math.min(delay, maxMs);\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Attempt 1: \" + getBackoffDelay(1, 100, 1000) + \"ms\");\n        System.out.println(\"Attempt 2: \" + getBackoffDelay(2, 100, 1000) + \"ms\");\n        System.out.println(\"Attempt 3: \" + getBackoffDelay(3, 100, 1000) + \"ms\");\n    }\n}",
      "expectedOutput": "Attempt 1: 100ms\nAttempt 2: 200ms\nAttempt 3: 400ms",
      "testCases": [
        {
          "name": "Compute Exponential Backoff",
          "expected": "Attempt 1: 100ms\nAttempt 2: 200ms\nAttempt 3: 400ms"
        }
      ],
      "hints": [
        "Use Math.min(delay, maxMs) to prevent unbounded backoff."
      ]
    }
  },
  {
    "id": "a6",
    "code": "A6",
    "level": "advanced",
    "title": "Spring Boot & Persistence",
    "subtitle": "Spring container, dependency injection, REST controllers, JPA and transactions",
    "icon": "🍃",
    "color": "#27AE60",
    "lessons": [
      {
        "id": "lesson-a6-1",
        "title": "Spring Inversion of Control & DI",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "The Spring Ecosystem",
            "content": "Spring Boot is the standard enterprise framework for Java. The **Spring Container** creates and injects dependencies (`@Service`, `@Repository`, `@RestController`), decoupling components."
          },
          {
            "type": "code",
            "title": "Spring REST Controller",
            "content": "Clean declarative endpoints.",
            "code": "@RestController\n@RequestMapping(\"/api/tasks\")\npublic class TaskController {\n    @GetMapping\n    public List<Task> getTasks() { return taskService.findAll(); }\n}"
          }
        ]
      },
      {
        "id": "lesson-a6-2",
        "title": "Spring Data JPA & Transactions",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "Data Persistence",
            "content": "Spring Data JPA manages database mapping with `@Entity` and repositories. `@Transactional` wraps method execution in an atomic database transaction."
          },
          {
            "type": "code",
            "title": "Repository Interface",
            "content": "Automatic SQL generation from method names.",
            "code": "public interface UserRepository extends JpaRepository<User, UUID> {\n    Optional<User> findByEmail(String email);\n}"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-a6",
      "xp": 75,
      "questions": [
        {
          "type": "mcq",
          "question": "Which Spring concept supplies an object with its dependencies rather than letting it construct them?",
          "options": [
            "Dependency injection",
            "Bytecode weaving only",
            "Garbage collection",
            "String interning"
          ],
          "answer": 0,
          "explanation": "Dependency injection provides collaborators to an object, promoting modularity and testability."
        },
        {
          "type": "mcq",
          "question": "What is the primary purpose of a database transaction in Spring?",
          "options": [
            "To group operations with defined commit/rollback behaviour",
            "To format Java code",
            "To compile classes",
            "To compress log files"
          ],
          "answer": 0,
          "explanation": "Transactions ensure atomicity: either all operations commit, or they rollback on error."
        },
        {
          "type": "true-false",
          "question": "Spring Data JPA automatically implements common CRUD operations without writing manual boilerplate SQL.",
          "answer": true,
          "explanation": "JpaRepository generates save, findById, findAll, delete implementations automatically."
        }
      ]
    },
    "codingTask": {
      "id": "code-a6",
      "title": "A6: Simulated DI Container",
      "prompt": "Implement a tiny Dependency Injection container simulation:\n`interface MessageService { String getMessage(); }`\n`class EmailService implements MessageService { public String getMessage() { return \"Spring DI Ready\"; } }`\n`class NotificationClient { private final MessageService svc; public NotificationClient(MessageService s) { this.svc = s; } public void send() { System.out.println(svc.getMessage()); } }`\nIn main, inject EmailService and call `send()`.",
      "starterCode": "interface MessageService { String getMessage(); }\nclass EmailService implements MessageService {\n    public String getMessage() { return \"Spring DI Ready\"; }\n}\nclass NotificationClient {\n    private final MessageService svc;\n    public NotificationClient(MessageService s) { this.svc = s; }\n    public void send() { System.out.println(svc.getMessage()); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        MessageService service = new EmailService();\n        NotificationClient client = new NotificationClient(service);\n        client.send();\n    }\n}",
      "expectedOutput": "Spring DI Ready",
      "testCases": [
        {
          "name": "Simulate Dependency Injection",
          "expected": "Spring DI Ready"
        }
      ],
      "hints": [
        "Pass EmailService into the NotificationClient constructor."
      ]
    }
  },
  {
    "id": "a7",
    "code": "A7",
    "level": "advanced",
    "title": "Performance & Observability",
    "subtitle": "Profiling, CPU/allocation bottlenecks, structured logging, metrics and tracing",
    "icon": "📈",
    "color": "#2C3E50",
    "lessons": [
      {
        "id": "lesson-a7-1",
        "title": "Profiling & Performance Bottlenecks",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "Measure Before Optimizing",
            "content": "Never guess bottlenecks! Use profilers (Async-Profiler, JProfiler, VisualVM) to measure CPU usage, heap allocations, and lock contention under realistic loads."
          },
          {
            "type": "code",
            "title": "Benchmarking with JMH",
            "content": "Java Microbenchmark Harness prevents JIT dead-code elimination artifacts.",
            "code": "@Benchmark\npublic void measurePerformance() {\n    // benchmarked code\n}"
          }
        ]
      },
      {
        "id": "lesson-a7-2",
        "title": "Observability: The Three Pillars",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "Logs, Metrics, Traces",
            "content": "**Logs** (discrete events), **Metrics** (aggregates like CPU, req/sec), and **Distributed Traces** (following a request across microservices) enable production diagnosis."
          },
          {
            "type": "code",
            "title": "Structured JSON Logging",
            "content": "Machine-parseable logging output.",
            "code": "// {\"timestamp\":\"...\",\"level\":\"INFO\",\"traceId\":\"...\",\"msg\":\"Order placed\"}"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-a7",
      "xp": 75,
      "questions": [
        {
          "type": "mcq",
          "question": "Why profile an application before attempting to optimize it?",
          "options": [
            "To identify measured bottlenecks rather than guessing",
            "To increase code length",
            "To avoid tests",
            "To remove all abstractions"
          ],
          "answer": 0,
          "explanation": "Profiling reveals actual hot spots in CPU, memory, and I/O so optimizations target real bottlenecks."
        },
        {
          "type": "mcq",
          "question": "What is the purpose of observability signals such as logs, metrics and traces?",
          "options": [
            "To understand system behaviour and diagnose issues in production",
            "To replace application security",
            "To compile code",
            "To eliminate database transactions"
          ],
          "answer": 0,
          "explanation": "Observability provides insight into internal state and system health across components."
        },
        {
          "type": "true-false",
          "question": "Premature optimization without profiling often adds unnecessary complexity without improving real performance.",
          "answer": true,
          "explanation": "\"Premature optimization is the root of all evil\" — Donald Knuth."
        }
      ]
    },
    "codingTask": {
      "id": "code-a7",
      "title": "A7: Simple LRU Cache Simulation",
      "prompt": "Implement a cache using `LinkedHashMap<String, String>` configured for access order:\n`LinkedHashMap<String, String> cache = new LinkedHashMap<>(4, 0.75f, true)`\nAdd keys \"A\", \"B\", \"C\". Access \"A\" with `cache.get(\"A\")`.\nPrint cache keys: `[B, C, A]` (notice \"A\" moved to the end as most recently used!).",
      "starterCode": "import java.util.LinkedHashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        LinkedHashMap<String, String> cache = new LinkedHashMap<>(4, 0.75f, true);\n        cache.put(\"A\", \"Alpha\");\n        cache.put(\"B\", \"Beta\");\n        cache.put(\"C\", \"Gamma\");\n        cache.get(\"A\"); // access moves to end\n        System.out.println(cache.keySet());\n    }\n}",
      "expectedOutput": "[B, C, A]",
      "testCases": [
        {
          "name": "Access Order LRU Ordering",
          "expected": "[B, C, A]"
        }
      ],
      "hints": [
        "The third boolean argument `true` in LinkedHashMap constructor specifies access-order."
      ]
    }
  },
  {
    "id": "a8",
    "code": "A8",
    "level": "advanced",
    "title": "Deployment & Engineering Workflow",
    "subtitle": "Packaging, Docker fundamentals, CI/CD pipelines, production readiness and monitoring",
    "icon": "🚀",
    "color": "#1B4F72",
    "lessons": [
      {
        "id": "lesson-a8-1",
        "title": "Containerization & Docker",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "Packaging for Production",
            "content": "Docker packages the Java application, dependencies, and JRE into a standardized, lightweight container image. Multi-stage builds produce tiny production images."
          },
          {
            "type": "code",
            "title": "Multi-stage Dockerfile",
            "content": "Build stage with JDK; runner stage with slim JRE.",
            "code": "FROM eclipse-temurin:21-jre-alpine\nWORKDIR /app\nCOPY target/*.jar app.jar\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]"
          }
        ]
      },
      {
        "id": "lesson-a8-2",
        "title": "CI/CD & Production Readiness",
        "xp": 50,
        "slides": [
          {
            "type": "intro",
            "title": "Automated Delivery",
            "content": "Continuous Integration runs tests and linters on every commit. Continuous Deployment deploys passing artifacts safely with health checks and rollbacks."
          },
          {
            "type": "code",
            "title": "Production Health Probes",
            "content": "Liveness and Readiness checks for Kubernetes.",
            "code": "// GET /actuator/health -> {\"status\":\"UP\"}"
          }
        ]
      }
    ],
    "challenge": {
      "id": "chall-a8",
      "xp": 75,
      "questions": [
        {
          "type": "true-false",
          "question": "Multi-stage Docker builds allow compiling with a full JDK but running with a slim JRE to minimize image size and attack surface.",
          "answer": true,
          "explanation": "Multi-stage builds discard the compiler and build tools, leaving only runtime necessities."
        },
        {
          "type": "mcq",
          "question": "What does a continuous integration (CI) pipeline do upon a git push?",
          "options": [
            "Automatically compiles code and runs automated test suites",
            "Edits source code directly",
            "Purchases server hardware",
            "Deletes git branches"
          ],
          "answer": 0,
          "explanation": "CI builds code and executes automated tests on every push to detect regressions immediately."
        },
        {
          "type": "output",
          "question": "What does a standard health check endpoint return when healthy?",
          "options": [
            "UP or 200 OK",
            "DOWN",
            "Exception",
            "404"
          ],
          "answer": 0,
          "explanation": "Health endpoints return status UP with HTTP 200 to signal readiness."
        }
      ]
    },
    "codingTask": {
      "id": "code-a8",
      "title": "A8: Application Health Indicator",
      "prompt": "Write a class that reports application status:\nIf database is connected and disk space > 100MB, return `\"STATUS: UP\"`\nIn main, print:\n`STATUS: UP`",
      "starterCode": "public class Main {\n    public static String getHealthStatus(boolean dbOk, long freeDiskMb) {\n        if (dbOk && freeDiskMb > 100) return \"STATUS: UP\";\n        return \"STATUS: DOWN\";\n    }\n    public static void main(String[] args) {\n        System.out.println(getHealthStatus(true, 500));\n    }\n}",
      "expectedOutput": "STATUS: UP",
      "testCases": [
        {
          "name": "Health Status UP",
          "expected": "STATUS: UP"
        }
      ],
      "hints": [
        "Check both parameters."
      ]
    }
  }
];

const PROJECTS = [
  {
    "id": "proj-beginner",
    "level": "beginner",
    "title": "Personal Expense Tracker (Console)",
    "description": "Build a console application to track daily income and expenses.",
    "requirements": [
      "Add, list, and categorize expenses (Food, Transport, Utilities, Fun)",
      "Calculate total spending and category breakdown",
      "Validate user inputs (non-negative amounts, valid dates)",
      "Save and load data to a text or CSV file"
    ],
    "rubric": "Variables, loops, methods, OOP classes, collections, exception handling, and file I/O."
  },
  {
    "id": "proj-intermediate",
    "level": "intermediate",
    "title": "Library / Inventory Management System",
    "description": "Build a database-backed inventory or library system.",
    "requirements": [
      "Search, add, update, and remove items with duplicate prevention",
      "Filter and sort using Java Streams and custom Comparators",
      "Persist data using JDBC with PreparedStatements",
      "Include automated JUnit 5 tests covering edge cases"
    ],
    "rubric": "Collections, Generics, JDBC, SQL, JUnit testing, and layered service architecture."
  },
  {
    "id": "proj-advanced",
    "level": "advanced",
    "title": "Task Management REST API (Spring Boot)",
    "description": "Design and deploy a production-ready REST service.",
    "requirements": [
      "JWT Authentication & role-based authorization",
      "CRUD task management with status, deadlines, and pagination",
      "Database persistence with Spring Data JPA and transactions",
      "Structured JSON logging, input validation, and containerized Dockerfile"
    ],
    "rubric": "Spring Boot, REST architecture, persistence, security, concurrency, and Docker packaging."
  }
];

const BADGES = [
  {
    "id": "first-lesson",
    "name": "First Steps",
    "icon": "👶",
    "description": "Completed your first lesson",
    "condition": "first_lesson"
  },
  {
    "id": "first-module",
    "name": "Module Master",
    "icon": "🎓",
    "description": "Completed your first module challenge",
    "condition": "first_module"
  },
  {
    "id": "first-code",
    "name": "Code Warrior",
    "icon": "💻",
    "description": "Solved your first coding question",
    "condition": "first_code"
  },
  {
    "id": "perfect-code",
    "name": "Ace Coder",
    "icon": "🎯",
    "description": "Solved a coding question on 1st attempt",
    "condition": "perfect_code"
  },
  {
    "id": "streak-3",
    "name": "On Fire!",
    "icon": "🔥",
    "description": "3-day learning streak",
    "condition": "streak_3"
  },
  {
    "id": "streak-7",
    "name": "Week Warrior",
    "icon": "⚡",
    "description": "7-day learning streak",
    "condition": "streak_7"
  },
  {
    "id": "perfect",
    "name": "Perfectionist",
    "icon": "💎",
    "description": "Perfect score on a quiz challenge",
    "condition": "perfect_challenge"
  },
  {
    "id": "level-5",
    "name": "Rising Engineer",
    "icon": "🚀",
    "description": "Reached Level 5",
    "condition": "level_5"
  },
  {
    "id": "level-10",
    "name": "Java Grandmaster",
    "icon": "👑",
    "description": "Reached Level 10",
    "condition": "level_10"
  },
  {
    "id": "beginner-done",
    "name": "Foundation Champion",
    "icon": "🌱",
    "description": "Completed all Beginner modules",
    "condition": "beginner_complete"
  },
  {
    "id": "inter-done",
    "name": "Robust Developer",
    "icon": "⚡",
    "description": "Completed all Intermediate modules",
    "condition": "inter_complete"
  },
  {
    "id": "advanced-done",
    "name": "Systems Architect",
    "icon": "🏆",
    "description": "Completed all Advanced modules",
    "condition": "advanced_complete"
  },
  {
    "id": "all-modules",
    "name": "Java Legend",
    "icon": "🥷",
    "description": "Conquered the entire 24-module map",
    "condition": "all_modules"
  }
];

const LEVELS = [
  {
    "level": 1,
    "name": "Novice",
    "xpRequired": 0,
    "icon": "🌱"
  },
  {
    "level": 2,
    "name": "Apprentice",
    "xpRequired": 150,
    "icon": "📖"
  },
  {
    "level": 3,
    "name": "Coder",
    "xpRequired": 400,
    "icon": "💻"
  },
  {
    "level": 4,
    "name": "Developer",
    "xpRequired": 800,
    "icon": "🔨"
  },
  {
    "level": 5,
    "name": "Engineer",
    "xpRequired": 1400,
    "icon": "⚙️"
  },
  {
    "level": 6,
    "name": "Architect",
    "xpRequired": 2200,
    "icon": "🏛️"
  },
  {
    "level": 7,
    "name": "Senior Dev",
    "xpRequired": 3200,
    "icon": "🎯"
  },
  {
    "level": 8,
    "name": "Tech Lead",
    "xpRequired": 4500,
    "icon": "🌟"
  },
  {
    "level": 9,
    "name": "Principal",
    "xpRequired": 6000,
    "icon": "💎"
  },
  {
    "level": 10,
    "name": "Java Grandmaster",
    "xpRequired": 8000,
    "icon": "👑"
  }
];

if (typeof window !== 'undefined') {
  window.CURRICULUM = CURRICULUM;
  window.PROJECTS   = PROJECTS;
  window.BADGES     = BADGES;
  window.LEVELS     = LEVELS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CURRICULUM, PROJECTS, BADGES, LEVELS };
}
