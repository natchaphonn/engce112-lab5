**Project Owner**: Kwanchai Eurviriyanukul

**Database Designed**: Methapon Metanipat, Kwanchai Eurviriyanukul

**UI Designed**: Puriphat Jirapornsawad, Kwanchai Eurviriyanukul

**API Designed**: Methapon Metanipat, Kwanchai Eurviriyanukul

**Developmen**t: Methapon Metanipat, Puriphat Jirapornsawad

```mermaid
erDiagram
    COFFEE {
        string(12) id PK
        string name
        string type
        float price
        float stock
        float maxOrder
        int roastedLevel
    }
    ORDER {
      string(12) id PK
      string name
      string address
      enum status
      float qty
      string(12) coffeeId FK
    }
    VILLAGE {
      string(8) id PK
      string name
      string(6) subDistrictId FK
    }
    SUB_DISTRICT {
      string(6) id PK
      string name
      string(4) districtId FK
    }
    DISTRICT {
      string(4) id PK
      string name
      string(2) provinceId FK
    }
    PROVINCE {
      string(2) id PK
      string name
    }
    COFFEE ||--o{ ORDER : have
    ORDER }|--|| VILLAGE : contains
    VILLAGE }|--|| SUB_DISTRICT : contains
    SUB_DISTRICT }|--|| DISTRICT : contains
    DISTRICT }|--|| PROVINCE : contains
```
