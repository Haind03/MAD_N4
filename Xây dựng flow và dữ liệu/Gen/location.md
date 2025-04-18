✅ Để làm đúng chức năng “Theo dõi vị trí”, bạn cần:
1. Thiết bị định vị GPS
Bạn phải có:

Một thiết bị gắn lên thú cưng (như thiết bị GPS mini, ESP32/ESP8266 có GPS hoặc định kỳ gửi vị trí về server).

Thiết bị này sẽ gửi dữ liệu latitude và longitude theo thời gian thực (hoặc gần thời gian thực) đến server (Firebase hoặc API của bạn).

Link bạn gửi là từ OpenStreetMap (OSM), nhưng nó là bản đồ tương tác (interactive), không phải ảnh tĩnh (static image). Tức là:

https://www.openstreetmap.org/#map=6/16.11/105.81 chỉ mở bản đồ dạng web.
đoạn mã này đang sử dụng API, nhưng không phải là thông qua một API chính thức với HTTP request mà là cách tạo URL để hiển thị bản đồ nhúng từ OpenStreetMap


Tuy nhiên, có thể nhúng nó bằng WebView như bạn đã từng làm với Google Maps!