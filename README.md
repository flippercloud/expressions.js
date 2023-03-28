# Flipper Expressions

> A schema for Flipper Expressions

```
 PASS  test/expressions.schema.test.js
  expressions.schema.json
    ✓ is a valid schema (2 ms)
    invalid
      ✓ {} (3 ms)
      ✓ []
      ✓ {"Any":[],"All":[]} (1 ms)
    constants
      valid
        ✓ "string"
        ✓ true
        ✓ false
        ✓ 1
        ✓ 1.1
      invalid
        ✓ null
    Any
      valid
        ✓ {"Any":[]} (1 ms)
        ✓ {"Any":[1,true,"string"]}
        ✓ {"Any":[{"Boolean":true},{"Property":"admin"}]}
      invalid
        ✓ {"Any":null} (1 ms)
        ✓ {"Any":"nope"}
    All
      valid
        ✓ {"All":[]}
        ✓ {"All":[1,true,"string"]}
        ✓ {"All":[{"Boolean":true},{"Property":"admin"}]}
      invalid
        ✓ {"All":null}
        ✓ {"All":"nope"}
    Boolean
      valid
        ✓ {"Boolean":true}
        ✓ {"Boolean":false}
        ✓ {"Boolean":"true"}
        ✓ {"Boolean":"false"}
        ✓ {"Boolean":0}
        ✓ {"Boolean":1}
        ✓ {"Boolean":[true]}
        ✓ {"Boolean":[false]} (1 ms)
        ✓ {"Boolean":["true"]}
        ✓ {"Boolean":["false"]}
        ✓ {"Boolean":[0]}
        ✓ {"Boolean":[1]}
        ✓ {"Boolean":{"Any":[]}} (1 ms)
        ✓ {"Boolean":[{"Any":[]}]}
      invalid
        ✓ {"Boolean":null}
        ✓ {"Boolean":[true,false]}
        ✓ {"Boolean":true,"Any":[]}
    String
      valid
        ✓ {"String":true}
        ✓ {"String":false}
        ✓ {"String":"true"}
        ✓ {"String":"false"} (1 ms)
        ✓ {"String":0}
        ✓ {"String":1}
        ✓ {"String":[true]}
        ✓ {"String":[false]}
        ✓ {"String":["true"]}
        ✓ {"String":["false"]}
        ✓ {"String":[0]}
        ✓ {"String":[1]}
        ✓ {"String":{"Any":[]}} (1 ms)
        ✓ {"String":[{"Any":[]}]}
      invalid
        ✓ {"String":null}
        ✓ {"String":[true,false]} (4 ms)
        ✓ {"String":true,"Any":[]}
    Number
      valid
        ✓ {"Number":true}
        ✓ {"Number":false}
        ✓ {"Number":"true"} (1 ms)
        ✓ {"Number":"false"}
        ✓ {"Number":0}
        ✓ {"Number":1}
        ✓ {"Number":[true]}
        ✓ {"Number":[false]}
        ✓ {"Number":["true"]}
        ✓ {"Number":["false"]} (1 ms)
        ✓ {"Number":[0]}
        ✓ {"Number":[1]}
        ✓ {"Number":{"Any":[]}}
        ✓ {"Number":[{"Any":[]}]}
      invalid
        ✓ {"Number":null}
        ✓ {"Number":[true,false]}
        ✓ {"Number":true,"Any":[]}
    Equal
      valid
        ✓ {"Equal":[1,1]}
        ✓ {"Equal":["a","b"]}
        ✓ {"Equal":[{"Property":"age"},21]}
      invalid
        ✓ {"Equal":[1,2,3]}
        ✓ {"Equal":[1]}
        ✓ {"Equal":1}
        ✓ {"Equal":null}
        ✓ {"Equal":[1,2],"Any":[]}
    GreaterThanOrEqualTo
      valid
        ✓ {"GreaterThanOrEqualTo":[1,1]}
        ✓ {"GreaterThanOrEqualTo":["a","b"]}
        ✓ {"GreaterThanOrEqualTo":[{"Property":"age"},21]}
      invalid
        ✓ {"GreaterThanOrEqualTo":[1,2,3]}
        ✓ {"GreaterThanOrEqualTo":[1]} (1 ms)
        ✓ {"GreaterThanOrEqualTo":1}
        ✓ {"GreaterThanOrEqualTo":null}
        ✓ {"GreaterThanOrEqualTo":[1,2],"Any":[]}
    GreaterThan
      valid
        ✓ {"GreaterThan":[1,1]}
        ✓ {"GreaterThan":["a","b"]}
        ✓ {"GreaterThan":[{"Property":"age"},21]}
      invalid
        ✓ {"GreaterThan":[1,2,3]}
        ✓ {"GreaterThan":[1]}
        ✓ {"GreaterThan":1}
        ✓ {"GreaterThan":null}
        ✓ {"GreaterThan":[1,2],"Any":[]}
    LessThanOrEqualTo
      valid
        ✓ {"LessThanOrEqualTo":[1,1]}
        ✓ {"LessThanOrEqualTo":["a","b"]}
        ✓ {"LessThanOrEqualTo":[{"Property":"age"},21]} (1 ms)
      invalid
        ✓ {"LessThanOrEqualTo":[1,2,3]}
        ✓ {"LessThanOrEqualTo":[1]}
        ✓ {"LessThanOrEqualTo":1}
        ✓ {"LessThanOrEqualTo":null}
        ✓ {"LessThanOrEqualTo":[1,2],"Any":[]} (1 ms)
    LessThan
      valid
        ✓ {"LessThan":[1,1]}
        ✓ {"LessThan":["a","b"]}
        ✓ {"LessThan":[{"Property":"age"},21]}
      invalid
        ✓ {"LessThan":[1,2,3]} (1 ms)
        ✓ {"LessThan":[1]}
        ✓ {"LessThan":1}
        ✓ {"LessThan":null}
        ✓ {"LessThan":[1,2],"Any":[]} (1 ms)
    NotEqual
      valid
        ✓ {"NotEqual":[1,1]}
        ✓ {"NotEqual":["a","b"]} (2 ms)
        ✓ {"NotEqual":[{"Property":"age"},21]}
      invalid
        ✓ {"NotEqual":[1,2,3]}
        ✓ {"NotEqual":[1]} (1 ms)
        ✓ {"NotEqual":1}
        ✓ {"NotEqual":null}
        ✓ {"NotEqual":[1,2],"Any":[]}
    Property
      valid
        ✓ {"Property":"name"} (1 ms)
        ✓ {"Property":["flipper_id"]}
      invalid
        ✓ {"Property":false}
        ✓ {"Property":[false]}
        ✓ {"Property":[]}
        ✓ {"Property":null}
    Time
      valid
        ✓ {"Time":"2021-01-01T00:00:00Z"} (1 ms)
        ✓ {"Time":["2021-01-01T00:00:00Z"]}
        ✓ {"Time":"2021-01-01T00:00:00-05:00"}
        ✓ {"Time":["2021-01-01T00:00:00-05:00"]}
        ✓ {"Time":{"Property":"created_at"}} (1 ms)
        ✓ {"Time":[{"Property":"created_at"}]}
      invalid
        ✓ {"Time":"2021-01-01"}
        ✓ {"Time":"January 1, 2021 10:00"}
        ✓ {"Time":null}
        ✓ {"Time":false}
        ✓ {"Time":[{"Property":"created_at"},{"Property":"updated_at"}]}
```
