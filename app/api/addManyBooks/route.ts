// import prisma from "../client";
// import { NextResponse, NextRequest } from "next/server";
// const Books = [
//   {
//     name: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     subject: "Fiction",
//     published: "01/01/2022",
//   },
//   {
//     name: "1984",
//     author: "George Orwell",
//     subject: "Dystopian",
//     published: "02/01/2022",
//   },
//   {
//     name: "Pride and Prejudice",
//     author: "Jane Austen",
//     subject: "Romance",
//     published: "03/01/2022",
//   },
//   {
//     name: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     subject: "Historical Fiction",
//     published: "04/01/2022",
//   },
//   {
//     name: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     subject: "Coming-of-Age",
//     published: "05/01/2022",
//   },
//   {
//     name: "The Hobbit",
//     author: "J.R.R. Tolkien",
//     subject: "Fantasy",
//     published: "06/01/2022",
//   },
//   {
//     name: "The Lord of the Rings",
//     author: "J.R.R. Tolkien",
//     subject: "Fantasy",
//     published: "07/01/2022",
//   },
//   {
//     name: "Harry Potter and the Sorcerer's Stone",
//     author: "J.K. Rowling",
//     subject: "Fantasy",
//     published: "08/01/2022",
//   },
//   {
//     name: "To All the Boys I've Loved Before",
//     author: "Jenny Han",
//     subject: "Young Adult",
//     published: "09/01/2022",
//   },
//   {
//     name: "The Hunger Games",
//     author: "Suzanne Collins",
//     subject: "Dystopian",
//     published: "10/01/2022",
//   },
//   {
//     name: "The Fault in Our Stars",
//     author: "John Green",
//     subject: "Young Adult",
//     published: "17/01/2022",
//   },
//   {
//     name: "The Da Vinci Code",
//     author: "Dan Brown",
//     subject: "Mystery",
//     published: "18/01/2022",
//   },
//   {
//     name: "The Girl with the Dragon Tattoo",
//     author: "Stieg Larsson",
//     subject: "Thriller",
//     published: "19/01/2022",
//   },
//   {
//     name: "The Alchemist",
//     author: "Paulo Coelho",
//     subject: "Adventure",
//     published: "20/01/2022",
//   },
//   {
//     name: "Gone Girl",
//     author: "Gillian Flynn",
//     subject: "Mystery",
//     published: "21/01/2022",
//   },
//   {
//     name: "The Help",
//     author: "Kathryn Stockett",
//     subject: "Historical Fiction",
//     published: "22/01/2022",
//   },
//   {
//     name: "Crazy Rich Asians",
//     author: "Kevin Kwan",
//     subject: "Romantic Comedy",
//     published: "23/01/2022",
//   },
//   {
//     name: "The Night Circus",
//     author: "Erin Morgenstern",
//     subject: "Fantasy",
//     published: "24/01/2022",
//   },
//   {
//     name: "The Kite Runner",
//     author: "Khaled Hosseini",
//     subject: "Historical Fiction",
//     published: "25/01/2022",
//   },
//   {
//     name: "The Book Thief",
//     author: "Markus Zusak",
//     subject: "Historical Fiction",
//     published: "26/01/2022",
//   },
//   {
//     name: "The Martian",
//     author: "Andy Weir",
//     subject: "Science Fiction",
//     published: "27/01/2022",
//   },
//   {
//     name: "The Handmaid's Tale",
//     author: "Margaret Atwood",
//     subject: "Dystopian",
//     published: "28/01/2022",
//   },
//   {
//     name: "Eleanor Oliphant Is Completely Fine",
//     author: "Gail Honeyman",
//     subject: "Fiction",
//     published: "29/01/2022",
//   },
//   {
//     name: "Educated",
//     author: "Tara Westover",
//     subject: "Autobiography",
//     published: "30/01/2022",
//   },
//   {
//     name: "Where the Crawdads Sing",
//     author: "Delia Owens",
//     subject: "Mystery",
//     published: "31/01/2022",
//   },
//   {
//     name: "The Goldfinch",
//     author: "Donna Tartt",
//     subject: "Literary Fiction",
//     published: "01/02/2022",
//   },
//   {
//     name: "Catcher in the Rye",
//     author: "J.D. Salinger",
//     subject: "Coming-of-Age",
//     published: "02/02/2022",
//   },
//   {
//     name: "The Bell Jar",
//     author: "Sylvia Plath",
//     subject: "Autobiographical Fiction",
//     published: "03/02/2022",
//   },
//   {
//     name: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     subject: "Southern Gothic",
//     published: "04/02/2022",
//   },
//   {
//     name: "Harry Potter and the Philosopher's Stone",
//     author: "J.K. Rowling",
//     subject: "Fantasy",
//     published: "05/02/2022",
//   },
//   {
//     name: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     subject: "Coming-of-Age",
//     published: "06/02/2022",
//   },
//   {
//     name: "Animal Farm",
//     author: "George Orwell",
//     subject: "Political Satire",
//     published: "07/02/2022",
//   },
//   {
//     name: "Jane Eyre",
//     author: "Charlotte Bronte",
//     subject: "Gothic Romance",
//     published: "08/02/2022",
//   },
//   {
//     name: "Lord of the Flies",
//     author: "William Golding",
//     subject: "Adventure",
//     published: "09/02/2022",
//   },
//   {
//     name: "Wuthering Heights",
//     author: "Emily Bronte",
//     subject: "Gothic Romance",
//     published: "10/02/2022",
//   },
//   {
//     name: "The Picture of Dorian Gray",
//     author: "Oscar Wilde",
//     subject: "Gothic Fiction",
//     published: "11/02/2022",
//   },
//   {
//     name: "Frankenstein",
//     author: "Mary Shelley",
//     subject: "Gothic Horror",
//     published: "12/02/2022",
//   },
//   {
//     name: "Brave New World",
//     author: "Aldous Huxley",
//     subject: "Dystopian Fiction",
//     published: "13/02/2022",
//   },
//   {
//     name: "1984",
//     author: "George Orwell",
//     subject: "Political Fiction",
//     published: "14/02/2022",
//   },
//   {
//     name: "Fahrenheit 451",
//     author: "Ray Bradbury",
//     subject: "Science Fiction",
//     published: "15/02/2022",
//   },
//   {
//     name: "Catch-22",
//     author: "Joseph Heller",
//     subject: "Satire",
//     published: "16/02/2022",
//   },
//   {
//     name: "The Grapes of Wrath",
//     author: "John Steinbeck",
//     subject: "Social Commentary",
//     published: "17/02/2022",
//   },
//   {
//     name: "The Scarlet Letter",
//     author: "Nathaniel Hawthorne",
//     subject: "Historical Fiction",
//     published: "18/02/2022",
//   },
//   {
//     name: "Moby-Dick",
//     author: "Herman Melville",
//     subject: "Adventure",
//     published: "19/02/2022",
//   },
//   {
//     name: "One Hundred Years of Solitude",
//     author: "Gabriel Garcia Marquez",
//     subject: "Magical Realism",
//     published: "20/02/2022",
//   },
//   {
//     name: "The Road",
//     author: "Cormac McCarthy",
//     subject: "Post-Apocalyptic",
//     published: "21/02/2022",
//   },
//   {
//     name: "The Count of Monte Cristo",
//     author: "Alexandre Dumas",
//     subject: "Adventure",
//     published: "22/02/2022",
//   },
//   {
//     name: "Don Quixote",
//     author: "Miguel de Cervantes",
//     subject: "Adventure",
//     published: "23/02/2022",
//   },
//   {
//     name: "Crime and Punishment",
//     author: "Fyodor Dostoevsky",
//     subject: "Psychological Fiction",
//     published: "24/02/2022",
//   },
//   {
//     name: "Anna Karenina",
//     author: "Leo Tolstoy",
//     subject: "Historical Fiction",
//     published: "25/02/2022",
//   },
// ];

// export async function POST(req: NextRequest) {
//   if (req.method === "POST") {
//     try {
//       // const { name, author, subject, published } = await req.json();
//       const newBook = await prisma.books.createMany({
//         data: Books
//       });

//       return NextResponse.json(
//         { message: "Books created successfully", book: newBook },
//         { status: 200 }
//       );
//     } catch (error: any) {
//       return NextResponse.json(
//         { message: "Error creating book", error: error.message },
//         { status: 500 }
//       );
//     } finally {
//       await prisma.$disconnect();
//     }
//   } else {
//     return NextResponse.json(
//       { message: "Method Not Allowed" },
//       { status: 405 }
//     );
//   }
// }


