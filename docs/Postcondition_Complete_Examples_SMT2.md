# SMT2 Conversions for Complete PrimRec Postcondition Examples

This file lists the SMT-LIB Horn conversion for every standalone example in `docs/Postcondition_Complete_Examples.md`.
The output was generated with the project converter exposed by `sourceToHornSmt2`.

---

## 1. Addition, Increment, and Doubling

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _inc (Int Int) Bool)
(declare-fun _double (Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((x Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat r)
             (nat succArg)
             (= succArg x)
             (= r (+ succArg 1)))
        (_inc x r))))

(assert
  (forall ((x Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 x)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_double x r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_plus x y r)
             (not (= r (+ x y))))
        false)))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (_inc x r)
             (not (= r (+ x 1))))
        false)))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (_double x r)
             (not (= r (* 2 x))))
        false)))
```

---

## 2. Predecessor, Truncated Subtraction, and Absolute Difference

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _predBase (Int) Bool)
(declare-fun _predStep (Int Int Int) Bool)
(declare-fun _pred (Int Int) Bool)
(declare-fun _subBase (Int Int) Bool)
(declare-fun _subStep (Int Int Int Int) Bool)
(declare-fun _sub (Int Int Int) Bool)
(declare-fun _absDiff (Int Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_predBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r y))
        (_predStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_predBase r))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r (- x 1)))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_subBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (= arg0 previous)
             (_pred arg0 r))
        (_subStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (= y 0)
             (_subBase x r))
        (_sub x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= y (+ previousCounter 1))
             (_sub x previousCounter previous)
             (_subStep x previousCounter previous r))
        (_sub x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg1_1 Int) (arg0_2 Int) (arg1_2 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg1_1)
             (nat arg0_2)
             (nat arg1_2)
             (= arg0_1 x)
             (= arg1 y)
             (_sub arg0_1 arg1 arg0)
             (= arg0_2 y)
             (= arg1_2 x)
             (_sub arg0_2 arg1_2 arg1_1)
             (_plus arg0 arg1_1 r))
        (_absDiff x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (_pred x r)
             (not (=> (= x 0) (= r 0))))
        false)))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (_pred x r)
             (not (=> (> x 0) (= r (- x 1)))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_sub x y r)
             (not (=> (>= x y) (= r (- x y)))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_sub x y r)
             (not (=> (< x y) (= r 0))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_sub x y r)
             (not (<= r x)))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_absDiff x y r)
             (not (=> (>= x y) (= r (- x y)))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_absDiff x y r)
             (not (=> (>= y x) (= r (- y x)))))
        false)))
```

---

## 3. Multiplication, Square, and Cube

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _mulBase (Int Int) Bool)
(declare-fun _mulStep (Int Int Int Int) Bool)
(declare-fun _mul (Int Int Int) Bool)
(declare-fun _square (Int Int) Bool)
(declare-fun _cube (Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 0))
        (_mulBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_mulStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (_mulBase x baseResult)
             (= increment x)
             (= r (+ baseResult (* y increment))))
        (_mul x y r))))

(assert
  (forall ((x Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 x)
             (= arg1 x)
             (_mul arg0 arg1 r))
        (_square x r))))

(assert
  (forall ((x Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int))
    (=> (and (nat x)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (= arg0_1 x)
             (_square arg0_1 arg0)
             (= arg1 x)
             (_mul arg0 arg1 r))
        (_cube x r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_mul x y r)
             (not (= r (* x y))))
        false)))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (_square x r)
             (not (= r (* x x))))
        false)))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (_cube x r)
             (not (= r (* (* x x) x))))
        false)))
```

---

## 4. Exponentiation and Fixed Bases

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _mulBase (Int Int) Bool)
(declare-fun _mulStep (Int Int Int Int) Bool)
(declare-fun _mul (Int Int Int) Bool)
(declare-fun _expBase (Int Int) Bool)
(declare-fun _expStep (Int Int Int Int) Bool)
(declare-fun _exp (Int Int Int) Bool)
(declare-fun _pow2 (Int Int) Bool)
(declare-fun _pow3 (Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 0))
        (_mulBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_mulStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (_mulBase x baseResult)
             (= increment x)
             (= r (+ baseResult (* y increment))))
        (_mul x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 1))
        (_expBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_mul arg0 arg1 r))
        (_expStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (= y 0)
             (_expBase x r))
        (_exp x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= y (+ previousCounter 1))
             (_exp x previousCounter previous)
             (_expStep x previousCounter previous r))
        (_exp x y r))))

(assert
  (forall ((n Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat n)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 2)
             (= arg1 n)
             (_exp arg0 arg1 r))
        (_pow2 n r))))

(assert
  (forall ((n Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat n)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 3)
             (= arg1 n)
             (_exp arg0 arg1 r))
        (_pow3 n r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_exp x y r)
             (not (= r (^ x y))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_exp x y r)
             (not (=> (= y 0) (= r 1))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_exp x y r)
             (not (=> (> y 0) (exists ((previous Int)) (and (nat previous)
             (= r (* previous x)))))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_pow2 n r)
             (not (= r (^ 2 n))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_pow3 n r)
             (not (= r (^ 3 n))))
        false)))
```

---

## 5. Factorial

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _mulBase (Int Int) Bool)
(declare-fun _mulStep (Int Int Int Int) Bool)
(declare-fun _mul (Int Int Int) Bool)
(declare-fun _factBase (Int) Bool)
(declare-fun _factStep (Int Int Int) Bool)
(declare-fun _fact (Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 0))
        (_mulBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_mulStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (_mulBase x baseResult)
             (= increment x)
             (= r (+ baseResult (* y increment))))
        (_mul x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 1))
        (_factBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int) (arg0 Int) (succArg Int) (arg1 Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat succArg)
             (nat arg1)
             (= succArg y)
             (= arg0 (+ succArg 1))
             (= arg1 previous)
             (_mul arg0 arg1 r))
        (_factStep y previous r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (= n 0)
             (_factBase r))
        (_fact n r))))

(assert
  (forall ((n Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat n)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= n (+ previousCounter 1))
             (_fact previousCounter previous)
             (_factStep previousCounter previous r))
        (_fact n r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_fact n r)
             (not (=> (= n 0) (= r 1))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_fact n r)
             (not (=> (> n 0) (>= r n))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_fact n r)
             (not (forall ((k Int)) (=> (nat k) (exists ((callResult Int)) (and (nat callResult)
             (_fact k callResult)
             (=> (= n (+ k 1)) (= r (* (+ k 1) callResult)))))))))
        false)))
```

---

## 6. Triangular Numbers and Sum of Squares

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _mulBase (Int Int) Bool)
(declare-fun _mulStep (Int Int Int Int) Bool)
(declare-fun _mul (Int Int Int) Bool)
(declare-fun _square (Int Int) Bool)
(declare-fun _triBase (Int) Bool)
(declare-fun _triStep (Int Int Int) Bool)
(declare-fun _tri (Int Int) Bool)
(declare-fun _sumSquaresBase (Int) Bool)
(declare-fun _sumSquaresStep (Int Int Int) Bool)
(declare-fun _sumSquares (Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 0))
        (_mulBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_mulStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (_mulBase x baseResult)
             (= increment x)
             (= r (+ baseResult (* y increment))))
        (_mul x y r))))

(assert
  (forall ((x Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 x)
             (= arg1 x)
             (_mul arg0 arg1 r))
        (_square x r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_triBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int) (succArg Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat succArg)
             (= arg0 previous)
             (= succArg y)
             (= arg1 (+ succArg 1))
             (_plus arg0 arg1 r))
        (_triStep y previous r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (= n 0)
             (_triBase r))
        (_tri n r))))

(assert
  (forall ((n Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat n)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= n (+ previousCounter 1))
             (_tri previousCounter previous)
             (_triStep previousCounter previous r))
        (_tri n r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_sumSquaresBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int) (arg0_1 Int) (succArg Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg0_1)
             (nat succArg)
             (= arg0 previous)
             (= succArg y)
             (= arg0_1 (+ succArg 1))
             (_square arg0_1 arg1)
             (_plus arg0 arg1 r))
        (_sumSquaresStep y previous r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (= n 0)
             (_sumSquaresBase r))
        (_sumSquares n r))))

(assert
  (forall ((n Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat n)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= n (+ previousCounter 1))
             (_sumSquares previousCounter previous)
             (_sumSquaresStep previousCounter previous r))
        (_sumSquares n r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_tri n r)
             (not (= r (div (* n (+ n 1)) 2))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_sumSquares n r)
             (not (= r (div (* (* n (+ n 1)) (+ (* 2 n) 1)) 6))))
        false)))
```

---

## 7. Boolean Values Over Naturals

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _mulBase (Int Int) Bool)
(declare-fun _mulStep (Int Int Int Int) Bool)
(declare-fun _mul (Int Int Int) Bool)
(declare-fun _isZeroBase (Int) Bool)
(declare-fun _isZeroStep (Int Int Int) Bool)
(declare-fun _isZero (Int Int) Bool)
(declare-fun _isNonZero (Int Int) Bool)
(declare-fun _boolNot (Int Int) Bool)
(declare-fun _boolAnd (Int Int Int) Bool)
(declare-fun _boolOr (Int Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 0))
        (_mulBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_mulStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (_mulBase x baseResult)
             (= increment x)
             (= r (+ baseResult (* y increment))))
        (_mul x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 1))
        (_isZeroBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r 0))
        (_isZeroStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_isZeroBase r))
        (_isZero x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r 0))
        (_isZero x r))))

(assert
  (forall ((x Int) (r Int) (arg0 Int) (arg0_1 Int))
    (=> (and (nat x)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (= arg0_1 x)
             (_isZero arg0_1 arg0)
             (_isZero arg0 r))
        (_isNonZero x r))))

(assert
  (forall ((b Int) (r Int) (arg0 Int))
    (=> (and (nat b)
             (nat r)
             (nat arg0)
             (= arg0 b)
             (_isZero arg0 r))
        (_boolNot b r))))

(assert
  (forall ((a Int) (b Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat a)
             (nat b)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 a)
             (= arg1 b)
             (_mul arg0 arg1 r))
        (_boolAnd a b r))))

(assert
  (forall ((a Int) (b Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int))
    (=> (and (nat a)
             (nat b)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (= arg0_1 a)
             (= arg1 b)
             (_plus arg0_1 arg1 arg0)
             (_isNonZero arg0 r))
        (_boolOr a b r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (_isZero x r)
             (not (or (= r 0) (= r 1))))
        false)))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (_isZero x r)
             (not (= (= r 1) (= x 0))))
        false)))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (_isNonZero x r)
             (not (or (= r 0) (= r 1))))
        false)))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (_isNonZero x r)
             (not (= (= r 1) (> x 0))))
        false)))

(assert
  (forall ((b Int) (r Int))
    (=> (and (nat b)
             (nat r)
             (_boolNot b r)
             (not (=> (= b 0) (= r 1))))
        false)))

(assert
  (forall ((b Int) (r Int))
    (=> (and (nat b)
             (nat r)
             (_boolNot b r)
             (not (=> (> b 0) (= r 0))))
        false)))

(assert
  (forall ((a Int) (b Int) (r Int))
    (=> (and (nat a)
             (nat b)
             (nat r)
             (_boolAnd a b r)
             (not (= r (* a b))))
        false)))

(assert
  (forall ((a Int) (b Int) (r Int))
    (=> (and (nat a)
             (nat b)
             (nat r)
             (_boolOr a b r)
             (not (or (= r 0) (= r 1))))
        false)))

(assert
  (forall ((a Int) (b Int) (r Int))
    (=> (and (nat a)
             (nat b)
             (nat r)
             (_boolOr a b r)
             (not (= (= r 1) (> (+ a b) 0))))
        false)))
```

---

## 8. Comparisons

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _predBase (Int) Bool)
(declare-fun _predStep (Int Int Int) Bool)
(declare-fun _pred (Int Int) Bool)
(declare-fun _subBase (Int Int) Bool)
(declare-fun _subStep (Int Int Int Int) Bool)
(declare-fun _sub (Int Int Int) Bool)
(declare-fun _mulBase (Int Int) Bool)
(declare-fun _mulStep (Int Int Int Int) Bool)
(declare-fun _mul (Int Int Int) Bool)
(declare-fun _isZeroBase (Int) Bool)
(declare-fun _isZeroStep (Int Int Int) Bool)
(declare-fun _isZero (Int Int) Bool)
(declare-fun _boolNot (Int Int) Bool)
(declare-fun _boolAnd (Int Int Int) Bool)
(declare-fun _leq (Int Int Int) Bool)
(declare-fun _geq (Int Int Int) Bool)
(declare-fun _lt (Int Int Int) Bool)
(declare-fun _gt (Int Int Int) Bool)
(declare-fun _eq (Int Int Int) Bool)
(declare-fun _neq (Int Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_predBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r y))
        (_predStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_predBase r))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r (- x 1)))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_subBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (= arg0 previous)
             (_pred arg0 r))
        (_subStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (= y 0)
             (_subBase x r))
        (_sub x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= y (+ previousCounter 1))
             (_sub x previousCounter previous)
             (_subStep x previousCounter previous r))
        (_sub x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 0))
        (_mulBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_mulStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (_mulBase x baseResult)
             (= increment x)
             (= r (+ baseResult (* y increment))))
        (_mul x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 1))
        (_isZeroBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r 0))
        (_isZeroStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_isZeroBase r))
        (_isZero x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r 0))
        (_isZero x r))))

(assert
  (forall ((b Int) (r Int) (arg0 Int))
    (=> (and (nat b)
             (nat r)
             (nat arg0)
             (= arg0 b)
             (_isZero arg0 r))
        (_boolNot b r))))

(assert
  (forall ((a Int) (b Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat a)
             (nat b)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 a)
             (= arg1 b)
             (_mul arg0 arg1 r))
        (_boolAnd a b r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (= arg0_1 x)
             (= arg1 y)
             (_sub arg0_1 arg1 arg0)
             (_isZero arg0 r))
        (_leq x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 y)
             (= arg1 x)
             (_leq arg0 arg1 r))
        (_geq x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (succArg Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat succArg)
             (nat arg1)
             (= succArg x)
             (= arg0 (+ succArg 1))
             (= arg1 y)
             (_leq arg0 arg1 r))
        (_lt x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 y)
             (= arg1 x)
             (_lt arg0 arg1 r))
        (_gt x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg1_1 Int) (arg0_2 Int) (arg1_2 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg1_1)
             (nat arg0_2)
             (nat arg1_2)
             (= arg0_1 x)
             (= arg1 y)
             (_leq arg0_1 arg1 arg0)
             (= arg0_2 x)
             (= arg1_2 y)
             (_geq arg0_2 arg1_2 arg1_1)
             (_boolAnd arg0 arg1_1 r))
        (_eq x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (= arg0_1 x)
             (= arg1 y)
             (_eq arg0_1 arg1 arg0)
             (_boolNot arg0 r))
        (_neq x y r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_leq x y r)
             (not (or (= r 0) (= r 1))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_leq x y r)
             (not (= (= r 1) (<= x y))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_lt x y r)
             (not (or (= r 0) (= r 1))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_lt x y r)
             (not (= (= r 1) (< x y))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_eq x y r)
             (not (or (= r 0) (= r 1))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_eq x y r)
             (not (= (= r 1) (= x y))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_neq x y r)
             (not (or (= r 0) (= r 1))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_neq x y r)
             (not (= (= r 1) (not (= x y)))))
        false)))
```

---

## 9. Min, Max, and Clamp

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _predBase (Int) Bool)
(declare-fun _predStep (Int Int Int) Bool)
(declare-fun _pred (Int Int) Bool)
(declare-fun _subBase (Int Int) Bool)
(declare-fun _subStep (Int Int Int Int) Bool)
(declare-fun _sub (Int Int Int) Bool)
(declare-fun _mulBase (Int Int) Bool)
(declare-fun _mulStep (Int Int Int Int) Bool)
(declare-fun _mul (Int Int Int) Bool)
(declare-fun _isZeroBase (Int) Bool)
(declare-fun _isZeroStep (Int Int Int) Bool)
(declare-fun _isZero (Int Int) Bool)
(declare-fun _isNonZero (Int Int) Bool)
(declare-fun _boolAnd (Int Int Int) Bool)
(declare-fun _leq (Int Int Int) Bool)
(declare-fun _geq (Int Int Int) Bool)
(declare-fun _ifZeroBase (Int Int Int) Bool)
(declare-fun _ifZeroStep (Int Int Int Int Int) Bool)
(declare-fun _ifZero (Int Int Int Int) Bool)
(declare-fun _ifNonZero (Int Int Int Int) Bool)
(declare-fun _iteValue (Int Int Int Int) Bool)
(declare-fun _min2 (Int Int Int) Bool)
(declare-fun _max2 (Int Int Int) Bool)
(declare-fun _clamp (Int Int Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_predBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r y))
        (_predStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_predBase r))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r (- x 1)))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_subBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (= arg0 previous)
             (_pred arg0 r))
        (_subStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (= y 0)
             (_subBase x r))
        (_sub x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= y (+ previousCounter 1))
             (_sub x previousCounter previous)
             (_subStep x previousCounter previous r))
        (_sub x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 0))
        (_mulBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_mulStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (_mulBase x baseResult)
             (= increment x)
             (= r (+ baseResult (* y increment))))
        (_mul x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 1))
        (_isZeroBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r 0))
        (_isZeroStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_isZeroBase r))
        (_isZero x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r 0))
        (_isZero x r))))

(assert
  (forall ((x Int) (r Int) (arg0 Int) (arg0_1 Int))
    (=> (and (nat x)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (= arg0_1 x)
             (_isZero arg0_1 arg0)
             (_isZero arg0 r))
        (_isNonZero x r))))

(assert
  (forall ((a Int) (b Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat a)
             (nat b)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 a)
             (= arg1 b)
             (_mul arg0 arg1 r))
        (_boolAnd a b r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (= arg0_1 x)
             (= arg1 y)
             (_sub arg0_1 arg1 arg0)
             (_isZero arg0 r))
        (_leq x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 y)
             (= arg1 x)
             (_leq arg0 arg1 r))
        (_geq x y r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat r)
             (= r thenValue))
        (_ifZeroBase thenValue elseValue r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (y Int) (previous Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat y)
             (nat previous)
             (nat r)
             (= r elseValue))
        (_ifZeroStep thenValue elseValue y previous r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (condition Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat condition)
             (nat r)
             (= condition 0)
             (_ifZeroBase thenValue elseValue r))
        (_ifZero thenValue elseValue condition r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (condition Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat condition)
             (nat r)
             (> condition 0)
             (= r elseValue))
        (_ifZero thenValue elseValue condition r))))

(assert
  (forall ((condition Int) (thenValue Int) (elseValue Int) (r Int) (arg0 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat condition)
             (nat thenValue)
             (nat elseValue)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg2)
             (= arg0 elseValue)
             (= arg1 thenValue)
             (= arg2 condition)
             (_ifZero arg0 arg1 arg2 r))
        (_ifNonZero condition thenValue elseValue r))))

(assert
  (forall ((condition Int) (thenValue Int) (elseValue Int) (r Int) (arg0 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat condition)
             (nat thenValue)
             (nat elseValue)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg2)
             (= arg0 condition)
             (= arg1 thenValue)
             (= arg2 elseValue)
             (_ifNonZero arg0 arg1 arg2 r))
        (_iteValue condition thenValue elseValue r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg1_1 Int) (arg2 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg1_1)
             (nat arg2)
             (= arg0_1 x)
             (= arg1 y)
             (_leq arg0_1 arg1 arg0)
             (= arg1_1 x)
             (= arg2 y)
             (_iteValue arg0 arg1_1 arg2 r))
        (_min2 x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg1_1 Int) (arg2 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg1_1)
             (nat arg2)
             (= arg0_1 x)
             (= arg1 y)
             (_geq arg0_1 arg1 arg0)
             (= arg1_1 x)
             (= arg2 y)
             (_iteValue arg0 arg1_1 arg2 r))
        (_max2 x y r))))

(assert
  (forall ((x Int) (lower Int) (upper Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg1_1 Int))
    (=> (and (nat x)
             (nat lower)
             (nat upper)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg1_1)
             (= arg0_1 x)
             (= arg1 lower)
             (_max2 arg0_1 arg1 arg0)
             (= arg1_1 upper)
             (_min2 arg0 arg1_1 r))
        (_clamp x lower upper r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_min2 x y r)
             (not (<= r x)))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_min2 x y r)
             (not (<= r y)))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_min2 x y r)
             (not (or (= r x) (= r y))))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_max2 x y r)
             (not (>= r x)))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_max2 x y r)
             (not (>= r y)))
        false)))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (_max2 x y r)
             (not (or (= r x) (= r y))))
        false)))

(assert
  (forall ((x Int) (lower Int) (upper Int) (r Int))
    (=> (and (nat x)
             (nat lower)
             (nat upper)
             (nat r)
             (_clamp x lower upper r)
             (not (=> (<= lower upper) (>= r lower))))
        false)))

(assert
  (forall ((x Int) (lower Int) (upper Int) (r Int))
    (=> (and (nat x)
             (nat lower)
             (nat upper)
             (nat r)
             (_clamp x lower upper r)
             (not (=> (<= lower upper) (<= r upper))))
        false)))

(assert
  (forall ((x Int) (lower Int) (upper Int) (r Int))
    (=> (and (nat x)
             (nat lower)
             (nat upper)
             (nat r)
             (_clamp x lower upper r)
             (not (=> (and (and (<= lower upper) (>= x lower)) (<= x upper)) (= r x))))
        false)))
```

---

## 10. Parity and Counting Odd Numbers

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _isZeroBase (Int) Bool)
(declare-fun _isZeroStep (Int Int Int) Bool)
(declare-fun _isZero (Int Int) Bool)
(declare-fun _boolNot (Int Int) Bool)
(declare-fun _oddBase (Int) Bool)
(declare-fun _oddStep (Int Int Int) Bool)
(declare-fun _odd (Int Int) Bool)
(declare-fun _even (Int Int) Bool)
(declare-fun _sumOddFlagsBase (Int) Bool)
(declare-fun _sumOddFlagsStep (Int Int Int) Bool)
(declare-fun _sumOddFlags (Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 1))
        (_isZeroBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r 0))
        (_isZeroStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_isZeroBase r))
        (_isZero x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r 0))
        (_isZero x r))))

(assert
  (forall ((b Int) (r Int) (arg0 Int))
    (=> (and (nat b)
             (nat r)
             (nat arg0)
             (= arg0 b)
             (_isZero arg0 r))
        (_boolNot b r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_oddBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int) (arg0 Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (= arg0 previous)
             (_boolNot arg0 r))
        (_oddStep y previous r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (= n 0)
             (_oddBase r))
        (_odd n r))))

(assert
  (forall ((n Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat n)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= n (+ previousCounter 1))
             (_odd previousCounter previous)
             (_oddStep previousCounter previous r))
        (_odd n r))))

(assert
  (forall ((n Int) (r Int) (arg0 Int) (arg0_1 Int))
    (=> (and (nat n)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (= arg0_1 n)
             (_odd arg0_1 arg0)
             (_boolNot arg0 r))
        (_even n r))))

(assert
  (forall ((r Int) (arg0 Int))
    (=> (and (nat r)
             (nat arg0)
             (= arg0 0)
             (_odd arg0 r))
        (_sumOddFlagsBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int) (arg0_1 Int) (succArg Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg0_1)
             (nat succArg)
             (= arg0 previous)
             (= succArg y)
             (= arg0_1 (+ succArg 1))
             (_odd arg0_1 arg1)
             (_plus arg0 arg1 r))
        (_sumOddFlagsStep y previous r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (= n 0)
             (_sumOddFlagsBase r))
        (_sumOddFlags n r))))

(assert
  (forall ((n Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat n)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= n (+ previousCounter 1))
             (_sumOddFlags previousCounter previous)
             (_sumOddFlagsStep previousCounter previous r))
        (_sumOddFlags n r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_odd n r)
             (not (or (= r 0) (= r 1))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_odd n r)
             (not (= (= r 1) (= (mod n 2) 1))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_even n r)
             (not (or (= r 0) (= r 1))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_even n r)
             (not (= (= r 1) (= (mod n 2) 0))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_sumOddFlags n r)
             (not (= r (div (+ n 1) 2))))
        false)))
```

---

## 11. Modulo, Quotient, and Divisibility

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _predBase (Int) Bool)
(declare-fun _predStep (Int Int Int) Bool)
(declare-fun _pred (Int Int) Bool)
(declare-fun _subBase (Int Int) Bool)
(declare-fun _subStep (Int Int Int Int) Bool)
(declare-fun _sub (Int Int Int) Bool)
(declare-fun _mulBase (Int Int) Bool)
(declare-fun _mulStep (Int Int Int Int) Bool)
(declare-fun _mul (Int Int Int) Bool)
(declare-fun _isZeroBase (Int) Bool)
(declare-fun _isZeroStep (Int Int Int) Bool)
(declare-fun _isZero (Int Int) Bool)
(declare-fun _boolAnd (Int Int Int) Bool)
(declare-fun _leq (Int Int Int) Bool)
(declare-fun _geq (Int Int Int) Bool)
(declare-fun _eq (Int Int Int) Bool)
(declare-fun _ifZeroBase (Int Int Int) Bool)
(declare-fun _ifZeroStep (Int Int Int Int Int) Bool)
(declare-fun _ifZero (Int Int Int Int) Bool)
(declare-fun _ifNonZero (Int Int Int Int) Bool)
(declare-fun _iteValue (Int Int Int Int) Bool)
(declare-fun _modBase (Int Int) Bool)
(declare-fun _modStep (Int Int Int Int) Bool)
(declare-fun _mod (Int Int Int) Bool)
(declare-fun _quotBase (Int Int) Bool)
(declare-fun _quotStep (Int Int Int Int) Bool)
(declare-fun _quot (Int Int Int) Bool)
(declare-fun _divides (Int Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_predBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r y))
        (_predStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_predBase r))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r (- x 1)))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_subBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (= arg0 previous)
             (_pred arg0 r))
        (_subStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (= y 0)
             (_subBase x r))
        (_sub x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= y (+ previousCounter 1))
             (_sub x previousCounter previous)
             (_subStep x previousCounter previous r))
        (_sub x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 0))
        (_mulBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_mulStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (_mulBase x baseResult)
             (= increment x)
             (= r (+ baseResult (* y increment))))
        (_mul x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 1))
        (_isZeroBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r 0))
        (_isZeroStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_isZeroBase r))
        (_isZero x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r 0))
        (_isZero x r))))

(assert
  (forall ((a Int) (b Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat a)
             (nat b)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 a)
             (= arg1 b)
             (_mul arg0 arg1 r))
        (_boolAnd a b r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (= arg0_1 x)
             (= arg1 y)
             (_sub arg0_1 arg1 arg0)
             (_isZero arg0 r))
        (_leq x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 y)
             (= arg1 x)
             (_leq arg0 arg1 r))
        (_geq x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg1_1 Int) (arg0_2 Int) (arg1_2 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg1_1)
             (nat arg0_2)
             (nat arg1_2)
             (= arg0_1 x)
             (= arg1 y)
             (_leq arg0_1 arg1 arg0)
             (= arg0_2 x)
             (= arg1_2 y)
             (_geq arg0_2 arg1_2 arg1_1)
             (_boolAnd arg0 arg1_1 r))
        (_eq x y r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat r)
             (= r thenValue))
        (_ifZeroBase thenValue elseValue r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (y Int) (previous Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat y)
             (nat previous)
             (nat r)
             (= r elseValue))
        (_ifZeroStep thenValue elseValue y previous r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (condition Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat condition)
             (nat r)
             (= condition 0)
             (_ifZeroBase thenValue elseValue r))
        (_ifZero thenValue elseValue condition r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (condition Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat condition)
             (nat r)
             (> condition 0)
             (= r elseValue))
        (_ifZero thenValue elseValue condition r))))

(assert
  (forall ((condition Int) (thenValue Int) (elseValue Int) (r Int) (arg0 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat condition)
             (nat thenValue)
             (nat elseValue)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg2)
             (= arg0 elseValue)
             (= arg1 thenValue)
             (= arg2 condition)
             (_ifZero arg0 arg1 arg2 r))
        (_ifNonZero condition thenValue elseValue r))))

(assert
  (forall ((condition Int) (thenValue Int) (elseValue Int) (r Int) (arg0 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat condition)
             (nat thenValue)
             (nat elseValue)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg2)
             (= arg0 condition)
             (= arg1 thenValue)
             (= arg2 elseValue)
             (_ifNonZero arg0 arg1 arg2 r))
        (_iteValue condition thenValue elseValue r))))

(assert
  (forall ((divisor Int) (r Int))
    (=> (and (nat divisor)
             (nat r)
             (= r 0))
        (_modBase divisor r))))

(assert
  (forall ((divisor Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg0_1 Int) (succArg Int) (arg1 Int) (arg1_1 Int) (arg2 Int) (succArg_1 Int))
    (=> (and (nat divisor)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat succArg)
             (nat arg1)
             (nat arg1_1)
             (nat arg2)
             (nat succArg_1)
             (= succArg previous)
             (= arg0_1 (+ succArg 1))
             (= arg1 divisor)
             (_eq arg0_1 arg1 arg0)
             (= arg1_1 0)
             (= succArg_1 previous)
             (= arg2 (+ succArg_1 1))
             (_iteValue arg0 arg1_1 arg2 r))
        (_modStep divisor y previous r))))

(assert
  (forall ((divisor Int) (n Int) (r Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (= n 0)
             (_modBase divisor r))
        (_mod divisor n r))))

(assert
  (forall ((divisor Int) (n Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= n (+ previousCounter 1))
             (_mod divisor previousCounter previous)
             (_modStep divisor previousCounter previous r))
        (_mod divisor n r))))

(assert
  (forall ((divisor Int) (r Int))
    (=> (and (nat divisor)
             (nat r)
             (= r 0))
        (_quotBase divisor r))))

(assert
  (forall ((divisor Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg0_1 Int) (arg0_2 Int) (arg1 Int) (succArg Int) (arg1_1 Int) (arg1_2 Int) (succArg_1 Int) (arg2 Int))
    (=> (and (nat divisor)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg0_2)
             (nat arg1)
             (nat succArg)
             (nat arg1_1)
             (nat arg1_2)
             (nat succArg_1)
             (nat arg2)
             (= arg0_2 divisor)
             (= succArg y)
             (= arg1 (+ succArg 1))
             (_mod arg0_2 arg1 arg0_1)
             (= arg1_1 0)
             (_eq arg0_1 arg1_1 arg0)
             (= succArg_1 previous)
             (= arg1_2 (+ succArg_1 1))
             (= arg2 previous)
             (_iteValue arg0 arg1_2 arg2 r))
        (_quotStep divisor y previous r))))

(assert
  (forall ((divisor Int) (n Int) (r Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (= n 0)
             (_quotBase divisor r))
        (_quot divisor n r))))

(assert
  (forall ((divisor Int) (n Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= n (+ previousCounter 1))
             (_quot divisor previousCounter previous)
             (_quotStep divisor previousCounter previous r))
        (_quot divisor n r))))

(assert
  (forall ((divisor Int) (n Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg1_1 Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg1_1)
             (= arg0_1 divisor)
             (= arg1 n)
             (_mod arg0_1 arg1 arg0)
             (= arg1_1 0)
             (_eq arg0 arg1_1 r))
        (_divides divisor n r))))

(assert
  (forall ((divisor Int) (n Int) (r Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (_mod divisor n r)
             (not (=> (> divisor 0) (= r (mod n divisor)))))
        false)))

(assert
  (forall ((divisor Int) (n Int) (r Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (_mod divisor n r)
             (not (=> (> divisor 0) (< r divisor))))
        false)))

(assert
  (forall ((divisor Int) (n Int) (r Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (_mod divisor n r)
             (not (=> (= divisor 0) (= r n))))
        false)))

(assert
  (forall ((divisor Int) (n Int) (r Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (_quot divisor n r)
             (not (=> (> divisor 0) (= r (div n divisor)))))
        false)))

(assert
  (forall ((divisor Int) (n Int) (r Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (_quot divisor n r)
             (not (=> (= divisor 0) (= r 0))))
        false)))

(assert
  (forall ((divisor Int) (n Int) (r Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (_divides divisor n r)
             (not (or (= r 0) (= r 1))))
        false)))

(assert
  (forall ((divisor Int) (n Int) (r Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (_divides divisor n r)
             (not (=> (> divisor 0) (= (= r 1) (= (mod n divisor) 0)))))
        false)))

(assert
  (forall ((divisor Int) (n Int) (r Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (_divides divisor n r)
             (not (=> (= divisor 0) (= (= r 1) (= n 0)))))
        false)))
```

---

## 12. Bounded Counting

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _predBase (Int) Bool)
(declare-fun _predStep (Int Int Int) Bool)
(declare-fun _pred (Int Int) Bool)
(declare-fun _subBase (Int Int) Bool)
(declare-fun _subStep (Int Int Int Int) Bool)
(declare-fun _sub (Int Int Int) Bool)
(declare-fun _mulBase (Int Int) Bool)
(declare-fun _mulStep (Int Int Int Int) Bool)
(declare-fun _mul (Int Int Int) Bool)
(declare-fun _isZeroBase (Int) Bool)
(declare-fun _isZeroStep (Int Int Int) Bool)
(declare-fun _isZero (Int Int) Bool)
(declare-fun _leq (Int Int Int) Bool)
(declare-fun _ifZeroBase (Int Int Int) Bool)
(declare-fun _ifZeroStep (Int Int Int Int Int) Bool)
(declare-fun _ifZero (Int Int Int Int) Bool)
(declare-fun _ifNonZero (Int Int Int Int) Bool)
(declare-fun _iteValue (Int Int Int Int) Bool)
(declare-fun _countUpToBase (Int Int) Bool)
(declare-fun _countUpToStep (Int Int Int Int) Bool)
(declare-fun _countUpTo (Int Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_predBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r y))
        (_predStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_predBase r))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r (- x 1)))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_subBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (= arg0 previous)
             (_pred arg0 r))
        (_subStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (= y 0)
             (_subBase x r))
        (_sub x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= y (+ previousCounter 1))
             (_sub x previousCounter previous)
             (_subStep x previousCounter previous r))
        (_sub x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 0))
        (_mulBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_mulStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (_mulBase x baseResult)
             (= increment x)
             (= r (+ baseResult (* y increment))))
        (_mul x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 1))
        (_isZeroBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r 0))
        (_isZeroStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_isZeroBase r))
        (_isZero x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r 0))
        (_isZero x r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (= arg0_1 x)
             (= arg1 y)
             (_sub arg0_1 arg1 arg0)
             (_isZero arg0 r))
        (_leq x y r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat r)
             (= r thenValue))
        (_ifZeroBase thenValue elseValue r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (y Int) (previous Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat y)
             (nat previous)
             (nat r)
             (= r elseValue))
        (_ifZeroStep thenValue elseValue y previous r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (condition Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat condition)
             (nat r)
             (= condition 0)
             (_ifZeroBase thenValue elseValue r))
        (_ifZero thenValue elseValue condition r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (condition Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat condition)
             (nat r)
             (> condition 0)
             (= r elseValue))
        (_ifZero thenValue elseValue condition r))))

(assert
  (forall ((condition Int) (thenValue Int) (elseValue Int) (r Int) (arg0 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat condition)
             (nat thenValue)
             (nat elseValue)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg2)
             (= arg0 elseValue)
             (= arg1 thenValue)
             (= arg2 condition)
             (_ifZero arg0 arg1 arg2 r))
        (_ifNonZero condition thenValue elseValue r))))

(assert
  (forall ((condition Int) (thenValue Int) (elseValue Int) (r Int) (arg0 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat condition)
             (nat thenValue)
             (nat elseValue)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg2)
             (= arg0 condition)
             (= arg1 thenValue)
             (= arg2 elseValue)
             (_ifNonZero arg0 arg1 arg2 r))
        (_iteValue condition thenValue elseValue r))))

(assert
  (forall ((limit Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg1_1 Int) (arg2 Int))
    (=> (and (nat limit)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg1_1)
             (nat arg2)
             (= arg0_1 0)
             (= arg1 limit)
             (_leq arg0_1 arg1 arg0)
             (= arg1_1 1)
             (= arg2 0)
             (_iteValue arg0 arg1_1 arg2 r))
        (_countUpToBase limit r))))

(assert
  (forall ((limit Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int) (arg0_1 Int) (arg0_2 Int) (succArg Int) (arg1_1 Int) (arg1_2 Int) (arg2 Int))
    (=> (and (nat limit)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg0_1)
             (nat arg0_2)
             (nat succArg)
             (nat arg1_1)
             (nat arg1_2)
             (nat arg2)
             (= arg0 previous)
             (= succArg y)
             (= arg0_2 (+ succArg 1))
             (= arg1_1 limit)
             (_leq arg0_2 arg1_1 arg0_1)
             (= arg1_2 1)
             (= arg2 0)
             (_iteValue arg0_1 arg1_2 arg2 arg1)
             (_plus arg0 arg1 r))
        (_countUpToStep limit y previous r))))

(assert
  (forall ((limit Int) (n Int) (r Int))
    (=> (and (nat limit)
             (nat n)
             (nat r)
             (= n 0)
             (_countUpToBase limit r))
        (_countUpTo limit n r))))

(assert
  (forall ((limit Int) (n Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat limit)
             (nat n)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= n (+ previousCounter 1))
             (_countUpTo limit previousCounter previous)
             (_countUpToStep limit previousCounter previous r))
        (_countUpTo limit n r))))

(assert
  (forall ((limit Int) (n Int) (r Int))
    (=> (and (nat limit)
             (nat n)
             (nat r)
             (_countUpTo limit n r)
             (not (=> (<= n limit) (= r (+ n 1)))))
        false)))

(assert
  (forall ((limit Int) (n Int) (r Int))
    (=> (and (nat limit)
             (nat n)
             (nat r)
             (_countUpTo limit n r)
             (not (=> (> n limit) (= r (+ limit 1)))))
        false)))
```

---

## 13. Cantor Pairing

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _predBase (Int) Bool)
(declare-fun _predStep (Int Int Int) Bool)
(declare-fun _pred (Int Int) Bool)
(declare-fun _subBase (Int Int) Bool)
(declare-fun _subStep (Int Int Int Int) Bool)
(declare-fun _sub (Int Int Int) Bool)
(declare-fun _mulBase (Int Int) Bool)
(declare-fun _mulStep (Int Int Int Int) Bool)
(declare-fun _mul (Int Int Int) Bool)
(declare-fun _isZeroBase (Int) Bool)
(declare-fun _isZeroStep (Int Int Int) Bool)
(declare-fun _isZero (Int Int) Bool)
(declare-fun _leq (Int Int Int) Bool)
(declare-fun _ifZeroBase (Int Int Int) Bool)
(declare-fun _ifZeroStep (Int Int Int Int Int) Bool)
(declare-fun _ifZero (Int Int Int Int) Bool)
(declare-fun _ifNonZero (Int Int Int Int) Bool)
(declare-fun _iteValue (Int Int Int Int) Bool)
(declare-fun _triBase (Int) Bool)
(declare-fun _triStep (Int Int Int) Bool)
(declare-fun _tri (Int Int) Bool)
(declare-fun _pair (Int Int Int) Bool)
(declare-fun _wBoundBase (Int Int) Bool)
(declare-fun _wBoundStep (Int Int Int Int) Bool)
(declare-fun _wBound (Int Int Int) Bool)
(declare-fun _w (Int Int) Bool)
(declare-fun _pairSecond (Int Int) Bool)
(declare-fun _pairFirst (Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_predBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r y))
        (_predStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_predBase r))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r (- x 1)))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_subBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (= arg0 previous)
             (_pred arg0 r))
        (_subStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (= y 0)
             (_subBase x r))
        (_sub x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= y (+ previousCounter 1))
             (_sub x previousCounter previous)
             (_subStep x previousCounter previous r))
        (_sub x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 0))
        (_mulBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_mulStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (_mulBase x baseResult)
             (= increment x)
             (= r (+ baseResult (* y increment))))
        (_mul x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 1))
        (_isZeroBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r 0))
        (_isZeroStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_isZeroBase r))
        (_isZero x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r 0))
        (_isZero x r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (= arg0_1 x)
             (= arg1 y)
             (_sub arg0_1 arg1 arg0)
             (_isZero arg0 r))
        (_leq x y r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat r)
             (= r thenValue))
        (_ifZeroBase thenValue elseValue r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (y Int) (previous Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat y)
             (nat previous)
             (nat r)
             (= r elseValue))
        (_ifZeroStep thenValue elseValue y previous r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (condition Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat condition)
             (nat r)
             (= condition 0)
             (_ifZeroBase thenValue elseValue r))
        (_ifZero thenValue elseValue condition r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (condition Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat condition)
             (nat r)
             (> condition 0)
             (= r elseValue))
        (_ifZero thenValue elseValue condition r))))

(assert
  (forall ((condition Int) (thenValue Int) (elseValue Int) (r Int) (arg0 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat condition)
             (nat thenValue)
             (nat elseValue)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg2)
             (= arg0 elseValue)
             (= arg1 thenValue)
             (= arg2 condition)
             (_ifZero arg0 arg1 arg2 r))
        (_ifNonZero condition thenValue elseValue r))))

(assert
  (forall ((condition Int) (thenValue Int) (elseValue Int) (r Int) (arg0 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat condition)
             (nat thenValue)
             (nat elseValue)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg2)
             (= arg0 condition)
             (= arg1 thenValue)
             (= arg2 elseValue)
             (_ifNonZero arg0 arg1 arg2 r))
        (_iteValue condition thenValue elseValue r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_triBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int) (succArg Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat succArg)
             (= arg0 previous)
             (= succArg y)
             (= arg1 (+ succArg 1))
             (_plus arg0 arg1 r))
        (_triStep y previous r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (= n 0)
             (_triBase r))
        (_tri n r))))

(assert
  (forall ((n Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat n)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= n (+ previousCounter 1))
             (_tri previousCounter previous)
             (_triStep previousCounter previous r))
        (_tri n r))))

(assert
  (forall ((a Int) (b Int) (r Int) (arg0 Int) (arg0_1 Int) (arg0_2 Int) (arg1 Int) (arg1_1 Int))
    (=> (and (nat a)
             (nat b)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg0_2)
             (nat arg1)
             (nat arg1_1)
             (= arg0_2 a)
             (= arg1 b)
             (_plus arg0_2 arg1 arg0_1)
             (_tri arg0_1 arg0)
             (= arg1_1 b)
             (_plus arg0 arg1_1 r))
        (_pair a b r))))

(assert
  (forall ((z Int) (r Int))
    (=> (and (nat z)
             (nat r)
             (= r 0))
        (_wBoundBase z r))))

(assert
  (forall ((z Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg0_1 Int) (arg0_2 Int) (succArg Int) (arg1 Int) (arg1_1 Int) (succArg_1 Int) (arg2 Int))
    (=> (and (nat z)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg0_2)
             (nat succArg)
             (nat arg1)
             (nat arg1_1)
             (nat succArg_1)
             (nat arg2)
             (= succArg y)
             (= arg0_2 (+ succArg 1))
             (_tri arg0_2 arg0_1)
             (= arg1 z)
             (_leq arg0_1 arg1 arg0)
             (= succArg_1 y)
             (= arg1_1 (+ succArg_1 1))
             (= arg2 previous)
             (_iteValue arg0 arg1_1 arg2 r))
        (_wBoundStep z y previous r))))

(assert
  (forall ((z Int) (limit Int) (r Int))
    (=> (and (nat z)
             (nat limit)
             (nat r)
             (= limit 0)
             (_wBoundBase z r))
        (_wBound z limit r))))

(assert
  (forall ((z Int) (limit Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat z)
             (nat limit)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= limit (+ previousCounter 1))
             (_wBound z previousCounter previous)
             (_wBoundStep z previousCounter previous r))
        (_wBound z limit r))))

(assert
  (forall ((z Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat z)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 z)
             (= arg1 z)
             (_wBound arg0 arg1 r))
        (_w z r))))

(assert
  (forall ((z Int) (r Int) (arg0 Int) (arg1 Int) (arg0_1 Int) (arg0_2 Int))
    (=> (and (nat z)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg0_1)
             (nat arg0_2)
             (= arg0 z)
             (= arg0_2 z)
             (_w arg0_2 arg0_1)
             (_tri arg0_1 arg1)
             (_sub arg0 arg1 r))
        (_pairSecond z r))))

(assert
  (forall ((z Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg0_2 Int))
    (=> (and (nat z)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg0_2)
             (= arg0_1 z)
             (_w arg0_1 arg0)
             (= arg0_2 z)
             (_pairSecond arg0_2 arg1)
             (_sub arg0 arg1 r))
        (_pairFirst z r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_tri n r)
             (not (= r (div (* n (+ n 1)) 2))))
        false)))

(assert
  (forall ((a Int) (b Int) (r Int) (s Int))
    (=> (and (nat a)
             (nat b)
             (nat r)
             (_pair a b r)
             (= s (+ a b))
             (not (= r (+ (div (* s (+ s 1)) 2) b))))
        false)))

(assert
  (forall ((z Int) (r Int))
    (=> (and (nat z)
             (nat r)
             (_pairFirst z r)
             (not (exists ((second Int)) (and (nat second)
             (exists ((callResult Int)) (and (nat callResult)
             (_pair r second callResult)
             (= callResult z)))))))
        false)))

(assert
  (forall ((z Int) (r Int))
    (=> (and (nat z)
             (nat r)
             (_pairSecond z r)
             (not (exists ((first Int)) (and (nat first)
             (exists ((callResult Int)) (and (nat callResult)
             (_pair first r callResult)
             (= callResult z)))))))
        false)))
```

---

## 14. Fibonacci

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _predBase (Int) Bool)
(declare-fun _predStep (Int Int Int) Bool)
(declare-fun _pred (Int Int) Bool)
(declare-fun _subBase (Int Int) Bool)
(declare-fun _subStep (Int Int Int Int) Bool)
(declare-fun _sub (Int Int Int) Bool)
(declare-fun _mulBase (Int Int) Bool)
(declare-fun _mulStep (Int Int Int Int) Bool)
(declare-fun _mul (Int Int Int) Bool)
(declare-fun _isZeroBase (Int) Bool)
(declare-fun _isZeroStep (Int Int Int) Bool)
(declare-fun _isZero (Int Int) Bool)
(declare-fun _leq (Int Int Int) Bool)
(declare-fun _ifZeroBase (Int Int Int) Bool)
(declare-fun _ifZeroStep (Int Int Int Int Int) Bool)
(declare-fun _ifZero (Int Int Int Int) Bool)
(declare-fun _ifNonZero (Int Int Int Int) Bool)
(declare-fun _iteValue (Int Int Int Int) Bool)
(declare-fun _triBase (Int) Bool)
(declare-fun _triStep (Int Int Int) Bool)
(declare-fun _tri (Int Int) Bool)
(declare-fun _pair (Int Int Int) Bool)
(declare-fun _wBoundBase (Int Int) Bool)
(declare-fun _wBoundStep (Int Int Int Int) Bool)
(declare-fun _wBound (Int Int Int) Bool)
(declare-fun _w (Int Int) Bool)
(declare-fun _pairSecond (Int Int) Bool)
(declare-fun _pairFirst (Int Int) Bool)
(declare-fun _fibPairBase (Int) Bool)
(declare-fun _fibPairStep (Int Int Int) Bool)
(declare-fun _fibPair (Int Int) Bool)
(declare-fun _fib (Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_predBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r y))
        (_predStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_predBase r))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r (- x 1)))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_subBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (= arg0 previous)
             (_pred arg0 r))
        (_subStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (= y 0)
             (_subBase x r))
        (_sub x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= y (+ previousCounter 1))
             (_sub x previousCounter previous)
             (_subStep x previousCounter previous r))
        (_sub x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 0))
        (_mulBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_mulStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (_mulBase x baseResult)
             (= increment x)
             (= r (+ baseResult (* y increment))))
        (_mul x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 1))
        (_isZeroBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r 0))
        (_isZeroStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_isZeroBase r))
        (_isZero x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r 0))
        (_isZero x r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (= arg0_1 x)
             (= arg1 y)
             (_sub arg0_1 arg1 arg0)
             (_isZero arg0 r))
        (_leq x y r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat r)
             (= r thenValue))
        (_ifZeroBase thenValue elseValue r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (y Int) (previous Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat y)
             (nat previous)
             (nat r)
             (= r elseValue))
        (_ifZeroStep thenValue elseValue y previous r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (condition Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat condition)
             (nat r)
             (= condition 0)
             (_ifZeroBase thenValue elseValue r))
        (_ifZero thenValue elseValue condition r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (condition Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat condition)
             (nat r)
             (> condition 0)
             (= r elseValue))
        (_ifZero thenValue elseValue condition r))))

(assert
  (forall ((condition Int) (thenValue Int) (elseValue Int) (r Int) (arg0 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat condition)
             (nat thenValue)
             (nat elseValue)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg2)
             (= arg0 elseValue)
             (= arg1 thenValue)
             (= arg2 condition)
             (_ifZero arg0 arg1 arg2 r))
        (_ifNonZero condition thenValue elseValue r))))

(assert
  (forall ((condition Int) (thenValue Int) (elseValue Int) (r Int) (arg0 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat condition)
             (nat thenValue)
             (nat elseValue)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg2)
             (= arg0 condition)
             (= arg1 thenValue)
             (= arg2 elseValue)
             (_ifNonZero arg0 arg1 arg2 r))
        (_iteValue condition thenValue elseValue r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_triBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int) (succArg Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat succArg)
             (= arg0 previous)
             (= succArg y)
             (= arg1 (+ succArg 1))
             (_plus arg0 arg1 r))
        (_triStep y previous r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (= n 0)
             (_triBase r))
        (_tri n r))))

(assert
  (forall ((n Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat n)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= n (+ previousCounter 1))
             (_tri previousCounter previous)
             (_triStep previousCounter previous r))
        (_tri n r))))

(assert
  (forall ((a Int) (b Int) (r Int) (arg0 Int) (arg0_1 Int) (arg0_2 Int) (arg1 Int) (arg1_1 Int))
    (=> (and (nat a)
             (nat b)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg0_2)
             (nat arg1)
             (nat arg1_1)
             (= arg0_2 a)
             (= arg1 b)
             (_plus arg0_2 arg1 arg0_1)
             (_tri arg0_1 arg0)
             (= arg1_1 b)
             (_plus arg0 arg1_1 r))
        (_pair a b r))))

(assert
  (forall ((z Int) (r Int))
    (=> (and (nat z)
             (nat r)
             (= r 0))
        (_wBoundBase z r))))

(assert
  (forall ((z Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg0_1 Int) (arg0_2 Int) (succArg Int) (arg1 Int) (arg1_1 Int) (succArg_1 Int) (arg2 Int))
    (=> (and (nat z)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg0_2)
             (nat succArg)
             (nat arg1)
             (nat arg1_1)
             (nat succArg_1)
             (nat arg2)
             (= succArg y)
             (= arg0_2 (+ succArg 1))
             (_tri arg0_2 arg0_1)
             (= arg1 z)
             (_leq arg0_1 arg1 arg0)
             (= succArg_1 y)
             (= arg1_1 (+ succArg_1 1))
             (= arg2 previous)
             (_iteValue arg0 arg1_1 arg2 r))
        (_wBoundStep z y previous r))))

(assert
  (forall ((z Int) (limit Int) (r Int))
    (=> (and (nat z)
             (nat limit)
             (nat r)
             (= limit 0)
             (_wBoundBase z r))
        (_wBound z limit r))))

(assert
  (forall ((z Int) (limit Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat z)
             (nat limit)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= limit (+ previousCounter 1))
             (_wBound z previousCounter previous)
             (_wBoundStep z previousCounter previous r))
        (_wBound z limit r))))

(assert
  (forall ((z Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat z)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 z)
             (= arg1 z)
             (_wBound arg0 arg1 r))
        (_w z r))))

(assert
  (forall ((z Int) (r Int) (arg0 Int) (arg1 Int) (arg0_1 Int) (arg0_2 Int))
    (=> (and (nat z)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg0_1)
             (nat arg0_2)
             (= arg0 z)
             (= arg0_2 z)
             (_w arg0_2 arg0_1)
             (_tri arg0_1 arg1)
             (_sub arg0 arg1 r))
        (_pairSecond z r))))

(assert
  (forall ((z Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg0_2 Int))
    (=> (and (nat z)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg0_2)
             (= arg0_1 z)
             (_w arg0_1 arg0)
             (= arg0_2 z)
             (_pairSecond arg0_2 arg1)
             (_sub arg0 arg1 r))
        (_pairFirst z r))))

(assert
  (forall ((r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 0)
             (= arg1 1)
             (_pair arg0 arg1 r))
        (_fibPairBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg0_2 Int) (arg0_3 Int) (arg1_1 Int) (arg0_4 Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg0_2)
             (nat arg0_3)
             (nat arg1_1)
             (nat arg0_4)
             (= arg0_1 previous)
             (_pairSecond arg0_1 arg0)
             (= arg0_3 previous)
             (_pairFirst arg0_3 arg0_2)
             (= arg0_4 previous)
             (_pairSecond arg0_4 arg1_1)
             (_plus arg0_2 arg1_1 arg1)
             (_pair arg0 arg1 r))
        (_fibPairStep y previous r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (= n 0)
             (_fibPairBase r))
        (_fibPair n r))))

(assert
  (forall ((n Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat n)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= n (+ previousCounter 1))
             (_fibPair previousCounter previous)
             (_fibPairStep previousCounter previous r))
        (_fibPair n r))))

(assert
  (forall ((n Int) (r Int) (arg0 Int) (arg0_1 Int))
    (=> (and (nat n)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (= arg0_1 n)
             (_fibPair arg0_1 arg0)
             (_pairFirst arg0 r))
        (_fib n r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_fib n r)
             (not (=> (= n 0) (= r 0))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_fib n r)
             (not (=> (= n 1) (= r 1))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_fib n r)
             (not (forall ((k Int)) (=> (nat k) (exists ((callResult Int) (callResult_1 Int)) (and (nat callResult)
             (nat callResult_1)
             (_fib (+ k 1) callResult)
             (_fib k callResult_1)
             (=> (= n (+ k 2)) (= r (+ callResult callResult_1)))))))))
        false)))
```

---

## 15. Bounded Prime Test

```smt2
(set-logic HORN)

(define-fun nat ((x Int)) Bool
  (>= x 0))

(declare-fun _plusBase (Int Int) Bool)
(declare-fun _plusStep (Int Int Int Int) Bool)
(declare-fun _plus (Int Int Int) Bool)
(declare-fun _predBase (Int) Bool)
(declare-fun _predStep (Int Int Int) Bool)
(declare-fun _pred (Int Int) Bool)
(declare-fun _subBase (Int Int) Bool)
(declare-fun _subStep (Int Int Int Int) Bool)
(declare-fun _sub (Int Int Int) Bool)
(declare-fun _mulBase (Int Int) Bool)
(declare-fun _mulStep (Int Int Int Int) Bool)
(declare-fun _mul (Int Int Int) Bool)
(declare-fun _isZeroBase (Int) Bool)
(declare-fun _isZeroStep (Int Int Int) Bool)
(declare-fun _isZero (Int Int) Bool)
(declare-fun _isNonZero (Int Int) Bool)
(declare-fun _boolNot (Int Int) Bool)
(declare-fun _boolAnd (Int Int Int) Bool)
(declare-fun _leq (Int Int Int) Bool)
(declare-fun _geq (Int Int Int) Bool)
(declare-fun _eq (Int Int Int) Bool)
(declare-fun _ifZeroBase (Int Int Int) Bool)
(declare-fun _ifZeroStep (Int Int Int Int Int) Bool)
(declare-fun _ifZero (Int Int Int Int) Bool)
(declare-fun _ifNonZero (Int Int Int Int) Bool)
(declare-fun _iteValue (Int Int Int Int) Bool)
(declare-fun _modBase (Int Int) Bool)
(declare-fun _modStep (Int Int Int Int) Bool)
(declare-fun _mod (Int Int Int) Bool)
(declare-fun _divides (Int Int Int) Bool)
(declare-fun _candidateDivisor (Int Int) Bool)
(declare-fun _isNonTrivialDivisor (Int Int Int) Bool)
(declare-fun _keepFirst (Int Int Int) Bool)
(declare-fun _leastDivisorBase (Int Int) Bool)
(declare-fun _leastDivisorStep (Int Int Int Int) Bool)
(declare-fun _leastNonTrivialDivisor (Int Int Int) Bool)
(declare-fun _hasNoSmallDivisor (Int Int) Bool)
(declare-fun _isAtLeastTwo (Int Int) Bool)
(declare-fun _isPrime (Int Int) Bool)

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_plusBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat succArg)
             (= succArg previous)
             (= r (+ succArg 1)))
        (_plusStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int) (succArg Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (nat succArg)
             (_plusBase x baseResult)
             (= succArg 0)
             (= increment (+ succArg 1))
             (= r (+ baseResult (* y increment))))
        (_plus x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 0))
        (_predBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r y))
        (_predStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_predBase r))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r (- x 1)))
        (_pred x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r x))
        (_subBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (= arg0 previous)
             (_pred arg0 r))
        (_subStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (= y 0)
             (_subBase x r))
        (_sub x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= y (+ previousCounter 1))
             (_sub x previousCounter previous)
             (_subStep x previousCounter previous r))
        (_sub x y r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= r 0))
        (_mulBase x r))))

(assert
  (forall ((x Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 previous)
             (= arg1 x)
             (_plus arg0 arg1 r))
        (_mulStep x y previous r))))

(assert
  (forall ((x Int) (y Int) (r Int) (baseResult Int) (increment Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat baseResult)
             (nat increment)
             (_mulBase x baseResult)
             (= increment x)
             (= r (+ baseResult (* y increment))))
        (_mul x y r))))

(assert
  (forall ((r Int))
    (=> (and (nat r)
             (= r 1))
        (_isZeroBase r))))

(assert
  (forall ((y Int) (previous Int) (r Int))
    (=> (and (nat y)
             (nat previous)
             (nat r)
             (= r 0))
        (_isZeroStep y previous r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (= x 0)
             (_isZeroBase r))
        (_isZero x r))))

(assert
  (forall ((x Int) (r Int))
    (=> (and (nat x)
             (nat r)
             (> x 0)
             (= r 0))
        (_isZero x r))))

(assert
  (forall ((x Int) (r Int) (arg0 Int) (arg0_1 Int))
    (=> (and (nat x)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (= arg0_1 x)
             (_isZero arg0_1 arg0)
             (_isZero arg0 r))
        (_isNonZero x r))))

(assert
  (forall ((b Int) (r Int) (arg0 Int))
    (=> (and (nat b)
             (nat r)
             (nat arg0)
             (= arg0 b)
             (_isZero arg0 r))
        (_boolNot b r))))

(assert
  (forall ((a Int) (b Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat a)
             (nat b)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 a)
             (= arg1 b)
             (_mul arg0 arg1 r))
        (_boolAnd a b r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (= arg0_1 x)
             (= arg1 y)
             (_sub arg0_1 arg1 arg0)
             (_isZero arg0 r))
        (_leq x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 y)
             (= arg1 x)
             (_leq arg0 arg1 r))
        (_geq x y r))))

(assert
  (forall ((x Int) (y Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg1_1 Int) (arg0_2 Int) (arg1_2 Int))
    (=> (and (nat x)
             (nat y)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg1_1)
             (nat arg0_2)
             (nat arg1_2)
             (= arg0_1 x)
             (= arg1 y)
             (_leq arg0_1 arg1 arg0)
             (= arg0_2 x)
             (= arg1_2 y)
             (_geq arg0_2 arg1_2 arg1_1)
             (_boolAnd arg0 arg1_1 r))
        (_eq x y r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat r)
             (= r thenValue))
        (_ifZeroBase thenValue elseValue r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (y Int) (previous Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat y)
             (nat previous)
             (nat r)
             (= r elseValue))
        (_ifZeroStep thenValue elseValue y previous r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (condition Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat condition)
             (nat r)
             (= condition 0)
             (_ifZeroBase thenValue elseValue r))
        (_ifZero thenValue elseValue condition r))))

(assert
  (forall ((thenValue Int) (elseValue Int) (condition Int) (r Int))
    (=> (and (nat thenValue)
             (nat elseValue)
             (nat condition)
             (nat r)
             (> condition 0)
             (= r elseValue))
        (_ifZero thenValue elseValue condition r))))

(assert
  (forall ((condition Int) (thenValue Int) (elseValue Int) (r Int) (arg0 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat condition)
             (nat thenValue)
             (nat elseValue)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg2)
             (= arg0 elseValue)
             (= arg1 thenValue)
             (= arg2 condition)
             (_ifZero arg0 arg1 arg2 r))
        (_ifNonZero condition thenValue elseValue r))))

(assert
  (forall ((condition Int) (thenValue Int) (elseValue Int) (r Int) (arg0 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat condition)
             (nat thenValue)
             (nat elseValue)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg2)
             (= arg0 condition)
             (= arg1 thenValue)
             (= arg2 elseValue)
             (_ifNonZero arg0 arg1 arg2 r))
        (_iteValue condition thenValue elseValue r))))

(assert
  (forall ((divisor Int) (r Int))
    (=> (and (nat divisor)
             (nat r)
             (= r 0))
        (_modBase divisor r))))

(assert
  (forall ((divisor Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg0_1 Int) (succArg Int) (arg1 Int) (arg1_1 Int) (arg2 Int) (succArg_1 Int))
    (=> (and (nat divisor)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat succArg)
             (nat arg1)
             (nat arg1_1)
             (nat arg2)
             (nat succArg_1)
             (= succArg previous)
             (= arg0_1 (+ succArg 1))
             (= arg1 divisor)
             (_eq arg0_1 arg1 arg0)
             (= arg1_1 0)
             (= succArg_1 previous)
             (= arg2 (+ succArg_1 1))
             (_iteValue arg0 arg1_1 arg2 r))
        (_modStep divisor y previous r))))

(assert
  (forall ((divisor Int) (n Int) (r Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (= n 0)
             (_modBase divisor r))
        (_mod divisor n r))))

(assert
  (forall ((divisor Int) (n Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= n (+ previousCounter 1))
             (_mod divisor previousCounter previous)
             (_modStep divisor previousCounter previous r))
        (_mod divisor n r))))

(assert
  (forall ((divisor Int) (n Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg1_1 Int))
    (=> (and (nat divisor)
             (nat n)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg1_1)
             (= arg0_1 divisor)
             (= arg1 n)
             (_mod arg0_1 arg1 arg0)
             (= arg1_1 0)
             (_eq arg0 arg1_1 r))
        (_divides divisor n r))))

(assert
  (forall ((y Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat y)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 y)
             (= arg1 2)
             (_plus arg0 arg1 r))
        (_candidateDivisor y r))))

(assert
  (forall ((n Int) (candidate Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat n)
             (nat candidate)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 candidate)
             (= arg1 n)
             (_divides arg0 arg1 r))
        (_isNonTrivialDivisor n candidate r))))

(assert
  (forall ((current Int) (candidate Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg2 Int))
    (=> (and (nat current)
             (nat candidate)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg2)
             (= arg0_1 current)
             (_isNonZero arg0_1 arg0)
             (= arg1 current)
             (= arg2 candidate)
             (_iteValue arg0 arg1 arg2 r))
        (_keepFirst current candidate r))))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (= r 0))
        (_leastDivisorBase n r))))

(assert
  (forall ((n Int) (y Int) (previous Int) (r Int) (arg0 Int) (arg1 Int) (arg0_1 Int) (arg0_2 Int) (arg1_1 Int) (arg0_3 Int) (arg1_2 Int) (arg0_4 Int) (arg2 Int))
    (=> (and (nat n)
             (nat y)
             (nat previous)
             (nat r)
             (nat arg0)
             (nat arg1)
             (nat arg0_1)
             (nat arg0_2)
             (nat arg1_1)
             (nat arg0_3)
             (nat arg1_2)
             (nat arg0_4)
             (nat arg2)
             (= arg0 previous)
             (= arg0_2 n)
             (= arg0_3 y)
             (_candidateDivisor arg0_3 arg1_1)
             (_isNonTrivialDivisor arg0_2 arg1_1 arg0_1)
             (= arg0_4 y)
             (_candidateDivisor arg0_4 arg1_2)
             (= arg2 0)
             (_iteValue arg0_1 arg1_2 arg2 arg1)
             (_keepFirst arg0 arg1 r))
        (_leastDivisorStep n y previous r))))

(assert
  (forall ((n Int) (limit Int) (r Int))
    (=> (and (nat n)
             (nat limit)
             (nat r)
             (= limit 0)
             (_leastDivisorBase n r))
        (_leastNonTrivialDivisor n limit r))))

(assert
  (forall ((n Int) (limit Int) (r Int) (previousCounter Int) (previous Int))
    (=> (and (nat n)
             (nat limit)
             (nat r)
             (nat previousCounter)
             (nat previous)
             (= limit (+ previousCounter 1))
             (_leastNonTrivialDivisor n previousCounter previous)
             (_leastDivisorStep n previousCounter previous r))
        (_leastNonTrivialDivisor n limit r))))

(assert
  (forall ((n Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg0_2 Int) (arg1_1 Int))
    (=> (and (nat n)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg0_2)
             (nat arg1_1)
             (= arg0_1 n)
             (= arg0_2 n)
             (= arg1_1 2)
             (_sub arg0_2 arg1_1 arg1)
             (_leastNonTrivialDivisor arg0_1 arg1 arg0)
             (_isZero arg0 r))
        (_hasNoSmallDivisor n r))))

(assert
  (forall ((n Int) (r Int) (arg0 Int) (arg1 Int))
    (=> (and (nat n)
             (nat r)
             (nat arg0)
             (nat arg1)
             (= arg0 n)
             (= arg1 2)
             (_geq arg0 arg1 r))
        (_isAtLeastTwo n r))))

(assert
  (forall ((n Int) (r Int) (arg0 Int) (arg0_1 Int) (arg1 Int) (arg0_2 Int))
    (=> (and (nat n)
             (nat r)
             (nat arg0)
             (nat arg0_1)
             (nat arg1)
             (nat arg0_2)
             (= arg0_1 n)
             (_isAtLeastTwo arg0_1 arg0)
             (= arg0_2 n)
             (_hasNoSmallDivisor arg0_2 arg1)
             (_boolAnd arg0 arg1 r))
        (_isPrime n r))))

(assert
  (forall ((n Int) (limit Int) (r Int))
    (=> (and (nat n)
             (nat limit)
             (nat r)
             (_leastNonTrivialDivisor n limit r)
             (not (or (= r 0) (and (>= r 2) (<= r (+ limit 2))))))
        false)))

(assert
  (forall ((n Int) (limit Int) (r Int))
    (=> (and (nat n)
             (nat limit)
             (nat r)
             (_leastNonTrivialDivisor n limit r)
             (not (=> (> r 0) (= (mod n r) 0))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_isPrime n r)
             (not (or (= r 0) (= r 1))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_isPrime n r)
             (not (=> (< n 2) (= r 0))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_isPrime n r)
             (not (=> (= r 1) (forall ((d Int)) (=> (nat d) (=> (and (>= d 2) (< d n)) (not (= (mod n d) 0))))))))
        false)))

(assert
  (forall ((n Int) (r Int))
    (=> (and (nat n)
             (nat r)
             (_isPrime n r)
             (not (=> (and (= r 0) (>= n 2)) (exists ((d_1 Int)) (and (nat d_1)
             (and (and (>= d_1 2) (< d_1 n)) (= (mod n d_1) 0)))))))
        false)))
```

---
