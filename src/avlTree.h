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
/*
	step 1: recursively find a NULL node to insert X;
	step 2: judge whether we need to rotate T or not,
			and execute the coordinate rotate method.
	Question:
		if we insert a number which are already in T.
*/

avlTree Delete(ElementType X, avlTree T);

#endif

