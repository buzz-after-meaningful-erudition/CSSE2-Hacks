---
layout: post
title: Quiz Questions for APCSA Unit 9
description: Questions and Code Cells for the Quiz on Unit 9
categories: [AP CSA]
permalink: /csa/units/quiz9
author: Soham Kamat & Aniket Chakradeo
---

## Unit 9: Inheritance
Which keyword is used to inherit a class in Java?<br>
a) inherits<br>
b) extends<br>
c) implements<br>
d) super

Answer: b) extends

What is the correct way to call a parent class's constructor in a subclass?<br>
a) super();<br>
b) parent();<br>
c) base();<br>
d) this();

Answer: a) super();

Which of the following statements about inheritance is true?<br>
a) A subclass can inherit private members of a superclass.<br>
b) A subclass cannot override methods of a superclass.<br>
c) A subclass can only have one superclass.<br>
d) A subclass must have the same name as the superclass.

Answer: c) A subclass can only have one superclass.

## Unit 10: Recursion

Which of the following is an example of a recursive method?<br>
a) A method that calls itself<br>
b) A method that calls another method<br>
c) A method that runs indefinitely<br>
d) A method that returns a value

Answer: a) A method that calls itself

What is the base case in a recursive method?<br>
a) The condition under which the method stops calling itself<br>
b) The first call to the recursive method<br>
c) The last call to the recursive method<br>
d) The condition under which the method calls itself

Answer: a) The condition under which the method stops calling itself

What will be the output of the following recursive method when called with factorial(3)?
```java
public int factorial(int n) {
    if (n == 0) {
        return 1;
    }
    return n * factorial(n - 1);
}
```
a) 6<br>
b) 3<br>
c) 0<br>
d) 1

Answer: a) 6
