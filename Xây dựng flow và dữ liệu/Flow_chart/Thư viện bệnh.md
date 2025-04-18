graph TD
  subgraph Thu_Vien_Benh
    direction TB
    D1["Màn Thư Viện Bệnh"]:::ui
    D2["diseases.ts (mock)"]:::data
    D3((Màn Chi Tiết Bệnh)):::todo
    D4["Lọc theo thú & danh mục"]:::note
    D5["Triệu chứng khẩn cấp"]:::note

    D1 --> D2
    D1 --> D3
    D1 --> D4
    D1 --> D5
  end

classDef ui fill:#def,stroke:#2a6,stroke-width:1;
classDef data fill:#e8e8e8,stroke:#555,stroke-width:1;
classDef note fill:#eef,stroke:#99c;
classDef todo fill:#fff0f6,stroke:#d33,stroke-width:1,stroke-dasharray:4 2;
