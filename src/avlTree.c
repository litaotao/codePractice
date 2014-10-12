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

