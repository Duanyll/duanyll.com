---
title: C++里重载运算符会如何
tags: [OOP]
author: duanyll
---

<!-- more -->

和直觉差不多，代码：

```cpp
#include <iostream>
using namespace std;

class base {
   public:
    bool operator<(const base& a) const {
        cout << "Base Called :" << typeid(*this).name() << ' '
             << typeid(a).name() << endl;
    }
    virtual ~base(){}
};

class a : public base {
   public:
    bool operator<(const a& a) const {
        cout << "A Called :" << typeid(*this).name() << ' ' << typeid(a).name()
             << endl;
    }
};

class b : public base {
   public:
    bool operator<(const b& a) const {
        cout << "B Called :" << typeid(*this).name() << ' ' << typeid(a).name()
             << endl;
    }
};

int main() {
    base* ptrbase = new base();
    a* ptra = new a();
    b* ptrb = new b();

    *ptra < *ptra;
    *dynamic_cast<base*>(ptra) < *dynamic_cast<base*>(ptrb);
    *dynamic_cast<base*>(ptrb) < *dynamic_cast<base*>(ptra);

    return 0;
}
```

结果：

```
A Called :1a 1a
Base Called :1a 1b
Base Called :1b 1a
```

以此可以实现跨类型的大小比较，用于`map`等等。