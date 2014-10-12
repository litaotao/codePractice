/*
* header for avlTree.c.
* Copyright (C) 2014 Taotao.li
* Email: litaotao@vip.163.com
*
* version: 0.0.1
* last updated: Oct.12th.2014
*/

#ifndef _AVLTREE_H

//definition for data type
struct avlNode{
	ElementType Element;
	avlTree Left;
	avlTree Right;
	int Height;     //why not unsigned int; height defined as -1 when T equals NULL.
};
typedef struct avlNode *Position;
typedef struct avlNode *avlTree;

//definition for functions
static int Height(Position P);
avlTree MakeEmpty(avlTree T);
Position Find(ElementType X, avlTree T);
Position FindMin(avlTree T);
Position FindMax(avlTree T);
avlTree Insert(ElementType X, avlTree T);
avlTree Delete(ElementType X, avlTree T);
void PreTraverse(avlTree T, (void *)func(Position node));
void MidTraverse(avlTree T, (void *)func(Position node));
void PostTraverse(avlTree T, (void *)func(Position node));
#endif

//tutorial for functions
/*
-----------------------------------------
avlTree Insert(ElementType X, avlTree T);
	Insert a node into avlTree.
	step 1: recursively find a NULL node to insert X;
	step 2: judge whether we need to rotate T or not,
			and execute the coordinate rotate method.
	Question:
		if we insert a number which are already in T.

-----------------------------------------
avlTree MakeEmpty(avlTree T);
	Erase all nodes and free memory of avlTree.

-----------------------------------------
Position Find(ElementType X, avlTree T);
	Find an element X in avlTree T, return its position
	in the tree. Is a procedure of binary search.

-----------------------------------------
Position FindMin(avlTree T);
	Find min in avlTree. Using recursive method.

-----------------------------------------
Position FindMax(avlTree T);
	Find max in avlTree. Using iterate method.

-----------------------------------------
void PreTraverse(avlTree T, (void *)func(Position node));
	Traverse avlTree in pre-order, apply function func
	to each node in the avlTree.
	
-----------------------------------------
void MidTraverse(avlTree T, (void *)func(Position node));
	Traverse avlTree in mid-order, apply function func
	to each node in the avlTree.

-----------------------------------------
void PostTraverse(avlTree T, (void *)func(Position node));
	Traverse avlTree in post-order, apply function func
	to each node in the avlTree.
*/
