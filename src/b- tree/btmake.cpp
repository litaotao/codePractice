/* Filename:  btmake.cpp

   Programmer:  Br. David Carlson

   Date:  November 2, 1997

   Last Modified:  December 21, 2001 to use NULLCHAR constant.

   This is a test program to create a table (B-tree-based) in a file.  It
   reads dictionary data from the source text file btree.txt.  This file
   contains on each line a word (in upper case, up to 12 characters) and
   starting in column 13 the definition (up to 36 characters).  The
   B-tree-based table will be stored in the file btree.dat.

   To compile this program under Visual C++, you will need to have the
   following files listed in the project:
   btmake.cpp   btree.cpp   itemtype.h   btree.h     table.h

   Use the associated btread program to look up data stored in this table.

   Tested with:
      Microsoft Visual C++ 6.0
      Microsoft Visual C++ .NET
      g++ under Linux
*/

#include "btree.h"

const int LineMax = KeyFieldMax + DFMaxPlus1;

typedef char StringType[LineMax];


/* Given:  InputFile   A file stream already opened for input on a text file.
   Task:   To read in a Word and its Definition from one line of this file.
   Return: Word        In char array form, the word read in.
           Definition  In char array form, the definition read in.
*/
void ReadLine(fstream & InputFile, KeyFieldType Word,
   DataFieldType Definition)
   {
   char Line[LineMax];
   int k, ch;

   InputFile.getline(Line, LineMax);   // will read the newline char

   for (k = 0; k < KeyFieldMax; k++)
      Word[k] = Line[k];
   Word[KeyFieldMax] = NULLCHAR;

   for (k = 0; k < DataFieldMax; k++)
      {
      ch = Line[KeyFieldMax + k];
      if (ch == '\n')
         break;
      Definition[k] = ch;
      }
   Definition[k] = NULLCHAR;
  }


/* Given:  InputFile   A file stream already opened for input.
   Task:   To read the data from InputFile and load it into the Table.
   Return: Table       The B-tree table containing the data.
*/
void Load(fstream & InputFile, BTTableClass & Table)
   {
   ItemType Item;
   int Count;

   Count = 0;
   ReadLine(InputFile, Item.KeyField, Item.DataField);

   while (! InputFile.fail())
      {
      #ifdef DEBUG
         Count++;
         if (Count == 22)
            {
            Count = 0;
            cout << endl << "Press ENTER";
            cin.get();
            }
         cout << endl << "DEBUG: ready to insert " << Item.KeyField << " ";
      #endif

      Table.Insert(Item);

      #ifdef DEBUG
         Table.Check();
      #endif

      ReadLine(InputFile, Item.KeyField, Item.DataField);
      }
   }


int main(void)
   {
   fstream Source;
   BTTableClass BTTable('w', "btree.dat");

   Source.open("btree.txt", ios::in);
   if (Source.fail())
      {
      cerr << "ERROR: Unable to open file btree.txt" << endl;
      exit(1);
      }

   Load(Source, BTTable);
   Source.close();
   return 0;
   }


