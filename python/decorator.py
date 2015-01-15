"""
e.g 1:
    Enforce function argument and return types.
    Note that this copies the func_name attribute
    from the old to the new function. func_name
    was made writable in Python 2.4a3:
"""

def accepts(*types):
    def check_accepts(f):
        assert len(types) == f.func_code.co_argcount
        def new_f(*args, **kwds):
            for (a, t) in zip(args, types):
                assert isinstance(a, t), \
                       "arg %r does not match %s" % (a,t)
            return f(*args, **kwds)
        new_f.func_name = f.func_name
        return new_f
    return check_accepts

def returns(rtype):
    def check_returns(f):
        def new_f(*args, **kwds):
            result = f(*args, **kwds)
            assert isinstance(result, rtype), \
                   "return value %r does not match %s" % (result,rtype)
            return result
        new_f.func_name = f.func_name
        return new_f
    return check_returns

@returns((int, float))
@accepts(int, (int, float))
def adder(arg1, arg2):
    """
    a simple adder, just add two number, and return the result.
    the arguments must be either int or float;
    the return number mush be either int or float;
    """
    return arg1 + arg2


if __name__ == '__main__':
    # run decorator test: adder
    import pdb; pdb.set_trace()
    adder(1, 2)
    adder(1, 2.)
    adder(1, '2')
