graph TD
  subgraph Quan_Ly_Thu_Cung
    direction TB
    A1["Màn Thêm Thú Cưng"]:::ui
    A2["Bộ Chọn Thú Cưng"]:::ui
    A3((Kho Thú Cưng)):::store

    A1 -->|addPet| A3
    A2 -->|setActivePet| A3
    A2 -. chuyển_trang .-> A1

    %% Trạng thái
    P1["pets"]:::state
    P2["activePetId"]:::state
    P3["healthRecords"]:::state
    P4["vaccinations"]:::state
    P5["reminders"]:::state
    P6["activities"]:::state
    P7["medicalDocs"]:::state
    A3 --> P1 & P2 & P3 & P4 & P5 & P6 & P7

    %% Hành động
    S1["Thêm / Cập nhật / Xóa Thú Cưng"]:::action
    S2["CRUD Hồ sơ & Tiêm chủng"]:::action
    A3 --> S1 & S2

    %% Getter
    G1["getActivePet"]:::getter
    G2["getUpcomingReminders"]:::getter
    A3 --> G1 & G2
  end

classDef ui fill:#def,stroke:#2a6,stroke-width:1;
classDef store fill:#ffe7a8,stroke:#c90,stroke-width:1;
classDef state fill:#fffdf2,stroke:#c90,stroke-width:1;
classDef action fill:#fde0e0,stroke:#d33,stroke-width:1;
classDef getter fill:#e5f4ff,stroke:#08c,stroke-width:1;
