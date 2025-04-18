graph TD
  subgraph Theo_Doi_Dinh_Vi
    direction TB
    L1["Màn Vị Trí"]:::ui
    L2["WebView - OpenStreetMap"]:::note
    L3["Ngẫu nhiên vị trí mỗi 5 giây"]:::note
    L1 --> L2
    L1 --> L3
  end

classDef ui fill:#def,stroke:#2a6,stroke-width:1;
classDef note fill:#eef,stroke:#99c;
