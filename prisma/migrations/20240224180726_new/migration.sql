-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "published" TEXT NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_bookmark" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_bookmark_AB_unique" ON "_bookmark"("A", "B");

-- CreateIndex
CREATE INDEX "_bookmark_B_index" ON "_bookmark"("B");

-- AddForeignKey
ALTER TABLE "_bookmark" ADD CONSTRAINT "_bookmark_A_fkey" FOREIGN KEY ("A") REFERENCES "Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bookmark" ADD CONSTRAINT "_bookmark_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
