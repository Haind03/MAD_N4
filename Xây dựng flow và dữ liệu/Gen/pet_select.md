
# Chức năng Pet Selection

Chức năng này giúp người dùng chọn và quản lý thông tin thú cưng trong một ứng dụng React Native. Giao diện cung cấp:

- Hiển thị thú cưng hiện tại
- Dropdown để chọn thú cưng khác
- Tìm kiếm thú cưng trong danh sách
- Thêm thú cưng mới

## Giải thích từng phần chi tiết:

### 1. Khai báo trạng thái và Router

```jsx
const router = useRouter();
const { pets, activePetId, setActivePet } = usePetStore();
const [dropdownVisible, setDropdownVisible] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
```

- `router`: Dùng để điều hướng sang các trang khác, cụ thể là sang màn hình thêm thú cưng mới.
- `pets`: Danh sách thú cưng hiện có từ store (`pet-store`).
- `activePetId`: ID của thú cưng đang được chọn.
- `setActivePet`: Hàm thay đổi thú cưng hiện tại.
- `dropdownVisible`: Trạng thái để mở hoặc đóng Modal (danh sách dropdown).
- `searchQuery`: Nội dung người dùng nhập để tìm kiếm thú cưng.

### 2. Hàm xử lý thêm thú cưng mới

```jsx
const handleAddPet = () => {
  router.push('/add-pet');
  setDropdownVisible(false);
};
```

Chuyển hướng người dùng sang màn hình thêm thú cưng mới và đóng dropdown nếu đang mở.

### 3. Hàm xử lý chọn thú cưng từ danh sách

```jsx
const handleSelectPet = (petId: string) => {
  setActivePet(petId);
  setDropdownVisible(false);
};
```

Chọn thú cưng mới làm thú cưng hiện tại, cập nhật store và đóng dropdown.

### 4. Lọc danh sách thú cưng dựa vào tìm kiếm

```jsx
const filteredPets = searchQuery 
  ? pets.filter(pet => pet.name.toLowerCase().includes(searchQuery.toLowerCase()))
  : pets;
```

Khi nhập nội dung vào ô tìm kiếm, danh sách thú cưng sẽ được lọc theo tên chứa nội dung tìm kiếm.

### 5. Hiển thị nút thêm thú cưng khi chưa có thú cưng nào

```jsx
if (pets.length === 0) {
  return (
    <TouchableOpacity style={styles.emptyContainer} onPress={handleAddPet}>
      <Plus size={24} color={Colors.primary} />
      <Text style={styles.emptyText}>Thêm thú cưng</Text>
    </TouchableOpacity>
  );
}
```

Nếu danh sách rỗng (chưa có thú cưng), hiển thị nút thêm thú cưng.

### 6. Hiển thị thú cưng đang được chọn hiện tại

```jsx
<TouchableOpacity 
  style={styles.dropdownButton}
  onPress={() => setDropdownVisible(true)}
>
  {activePet ? (
    <View style={styles.selectedPet}>
      <Image source={{ uri: activePet.imageUrl }} style={styles.selectedPetImage} />
      <View style={styles.selectedPetInfo}>
        <Text style={styles.selectedPetName}>{activePet.name}</Text>
        <Text style={styles.selectedPetBreed}>{activePet.breed}</Text>
      </View>
      <ChevronDown size={20} color={Colors.textLight} />
    </View>
  ) : (
    <View style={styles.selectedPet}>
      <Text style={styles.placeholderText}>Chọn thú cưng</Text>
      <ChevronDown size={20} color={Colors.textLight} />
    </View>
  )}
</TouchableOpacity>
```

Hiển thị thú cưng hiện tại với hình ảnh, tên và giống thú cưng.

Nếu chưa chọn thú cưng nào thì hiển thị chữ "Chọn thú cưng".

Chạm vào để mở danh sách dropdown.

### 7. Modal hiển thị danh sách thú cưng dạng dropdown

```jsx
<Modal visible={dropdownVisible} transparent animationType="fade">
```

Hiển thị dropdown dưới dạng modal phủ toàn màn hình với hiệu ứng fade-in/out.

### 8. Phần tìm kiếm thú cưng trong Modal

```jsx
<View style={styles.searchContainer}>
  <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
  <TextInput
    style={styles.searchInput}
    placeholder="Tìm kiếm thú cưng..."
    placeholderTextColor={Colors.textLight}
    value={searchQuery}
    onChangeText={setSearchQuery}
  />
  {searchQuery.length > 0 && (
    <TouchableOpacity onPress={() => setSearchQuery('')}>
      <X size={18} color={Colors.textLight} />
    </TouchableOpacity>
  )}
</View>
```

Ô nhập tìm kiếm cho phép người dùng lọc danh sách thú cưng theo tên.

Icon X để xóa nhanh nội dung tìm kiếm.

### 9. Hiển thị danh sách thú cưng (Filtered) sử dụng FlatList

```jsx
<FlatList
  data={filteredPets}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity 
      style={[
        styles.petItem,
        item.id === activePetId && styles.activePetItem
      ]}
      onPress={() => handleSelectPet(item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petBreed}>{item.breed}</Text>
      </View>
    </TouchableOpacity>
  )}
  ListEmptyComponent={
    <View style={styles.emptyList}>
      <Text style={styles.emptyListText}>
        {searchQuery.length > 0 
          ? 'Không tìm thấy thú cưng nào' 
          : 'Chưa có thú cưng nào'}
      </Text>
    </View>
  }
/>
```

Hiển thị danh sách thú cưng với hình ảnh, tên và giống.

Thú cưng đang chọn được đánh dấu nổi bật.

Thông báo khi không tìm thấy hoặc chưa có thú cưng nào.

### 10. Nút thêm thú cưng mới trong Modal

```jsx
<TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
  <Plus size={20} color={Colors.card} />
  <Text style={styles.addButtonText}>Thêm thú cưng mới</Text>
</TouchableOpacity>
```

Nút này giúp người dùng thêm thú cưng mới vào danh sách.

## Kết luận:
Chức năng Pet Selection là một giao diện hoàn chỉnh để chọn, thêm, tìm kiếm và quản lý thú cưng, giúp người dùng dễ dàng thao tác và quản lý thông tin một cách trực quan trong ứng dụng React Native.
