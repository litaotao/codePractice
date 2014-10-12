/*
 * implementation of avlTree.c.
 * Copyright (C) 2014 Taotao.li
 * Email: litaotao@vip.163.com
 *
 * version: 0.0.1
 * last updated: Oct.12th.2014
*/

#include "avlTree.h"
#include <stdio.h>
#include <stdlib.h>

static int Height(Position P){
	return (NULL==P?-1:P->Height);
}

avlTree MakeEmpty(avlTree T)
{
	if (NULL != T)
	{
		MakeEmpty(T->Right);
		MakeEmpty(T->Left);
		free(T);
	}
	return NULL;
}

Position Find(ElementType X, avlTree T)
{
	if (NULL != T)
	{
		if (X == T->Element)
		{
			return T;
		}
		else if (X < T->Element)
		{
			return Find(X, T->Left);
		}
		else(X > T->Element)
		{
			return Find(X, T->Right);
		}
	}

	return NULL;
}

Position FindMin(avlTree T)
{
	if (NULL != T)
	{
		// (NULL!=T->Left)?return FindMin(T->Left) : return T;
		if (NULL != T->Left)
		{
			return FindMin(T->Left);
		}
		else
		{
			return T;
		}
	}

	return NULL;
}

Position FindMax(avlTree T)
{
	if (NULL != T)
	{
		while(NULL != T->Right)
		{
			T = T->Right;
		}
		return T;
	}

	return NULL;
}




avlTree Insert(ElementType X, avlTree T)
{
	if (NULL == T)
	{
		T = (avlTree)malloc(sizeof(avlNode));
		T->Element = X;
		T->Left = T->Right = NULL;
	}
	else if (X > T->Element)
	{
		T->Right = Insert(X, T->Right);
		if (Height(T->Right) - Height(T->Left) == 2)
		{
			if (X > T->Right->Element)
			{
				T = SingleRotateWithRight(T);
			}
			else
			{
				T = DoubleRotateWithRight(T);
			}
		}
	}
	else if (X < T->Element)
	{
		T->Left = Insert(X, T->Left);
		if (Height(T->Left) - Height(T->Right) == 2)
		{
			if (X < T->Left->Element)
			{
				T = SingleRotateWithLeft(T);
			}
			else
			{
				T = DoubleRotateWithLeft(T);
			}
		}
	}

	T->Height = Max(Height(T->Left), Height(T->Right)) + 1;
	return T;
}

/*
* This function can be called only if K2 has a left child,
* Perform a rotate between a node(K2) and its left child,
* Update heights, then return new root.
*/
static Position SingleRotateWithLeft(Position K2)
{
	Position K1;
	K1 = K2->Left;
	K2->Left = K1->Right;
	K1->Right = K2;

	K2->Height = max(Height(K2->Right), Height(K2->Right)) + 1;
	K1->Height = max(Height(K1->Right), Height(K1->Right)) + 1;

	return K1;
}

/*
* This function can be called only if K2 has a right child,
* Perform a rotate between a node(K2) and its right child,
* Update heights, then return new root.
*/
static Position SingleRotateWithRight(Position K2)
{
	Position K1;
	K1 = K2->Right;
	K2->Right = K1->Left;
	K1->Left = K2;

	K2->Height = max(Height(K2->Right), Height(K2->Right)) + 1;
	K1->Height = max(Height(K1->Right), Height(K1->Right)) + 1;

	return K1;
}

/*
* This function can be called only if K3 has a left
* child and K3's left child has a right child, do the 
* left-right double rotation.
* update heights, then return the new root.
*/
static Position DoubleRotateWithLeft(Position K3)
{
	//Rotation between K1 and K2
	K3->Left = SingleRotateWithRight(K3->Left);

	//Rotation between k3 and k2
	return SingleRotateWithLeft(K3);
}

/*
* This function can be called only if K3 has a right
* child and K3's right child has a left child, do the 
* right-left double rotation.
* update heights, then return the new root.
*/
static Position DoubleRotateWithLeft(Position K3)
{
	//Rotation between K1 and K2
	K3->Right = SingleRotateWithLeft(K3->Right);

	//Rotation between k3 and k2
	return SingleRotateWithRight(K3);
}