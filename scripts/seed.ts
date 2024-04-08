import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Hindi",
        imageSrc: "India.svg",
      },
      {
        id: 2,
        title: "Spanish",
        imageSrc: "es.svg",
      },
      {
        id: 3,
        title: "French",
        imageSrc: "fr.svg",
      },
      {
        id: 4,
        title: "Italian",
        imageSrc: "it.svg",
      },
      {
        id: 5,
        title: "Croation",
        imageSrc: "hr.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, //Hindi
        title: "Unit 1",
        description: "Learn the basics of Hindi",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, //Unit 1(Learn the basics...)
        order: 1,
        title: "Vowels",
      },
      {
        id: 2,
        unitId: 1, //Unit 1(Learn the basics...)
        order: 2,
        title: "Nonus",
      },
      {
        id: 3,
        unitId: 1, //Unit 1(Learn the basics...)
        order: 3,
        title: "Nonus",
      },
      {
        id: 4,
        unitId: 1, //Unit 1(Learn the basics...)
        order: 4,
        title: "Nonus",
      },
      {
        id: 5,
        unitId: 1, //Unit 1(Learn the basics...)
        order: 5,
        title: "Nonus",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, //vowels
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "A man"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1, // Which one of these is "A man"?
        imageSrc: "man.svg",
        correct: true,
        text: "एक आदमी",
        audioSrc: "/hindi_man.mp3",
      },
      {
        id: 2,
        challengeId: 1, // Which one of these is "A man"?
        imageSrc: "woman.svg",
        correct: false,
        text: "एक औरत",
        audioSrc: "/hindi_woman.mp3",
      },
      {
        id: 3,
        challengeId: 1, // Which one of these is "A man"?
        imageSrc: "robot.svg",
        correct: false,
        text: "एक रोबोट",
        audioSrc: "/hindi_robot.mp3",
      },
      {
        id: 4,
        challengeId: 1, // Which one of these is "A man"?
        imageSrc: "child.svg",
        correct: false,
        text: "एक बच्चा",
        audioSrc: "/hindi_child.mp3",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();