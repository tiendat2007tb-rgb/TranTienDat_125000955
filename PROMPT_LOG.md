# NHẬT KÝ PROMPT ENGINEERING (VIBE CODING LOG)

- **Họ và tên:** Trần Tiến Đạt
- **MSSV:** 125000955
- **Tên đề tài Website:** CineVerse — Website giới thiệu và gợi ý phim
- **Công cụ AI đã sử dụng:** ChatGPT
- **Công nghệ:** HTML5, CSS3, JavaScript, Animate.css, AOS

> Lưu ý: Nhật ký dưới đây là bản mẫu tham khảo theo quá trình xây dựng dự án. Hãy điều chỉnh lại để phản ánh đúng các prompt và thao tác thực tế của bạn trước khi nộp.

## 1. Yêu cầu ban đầu (System/Initial Prompt)

**Prompt đã dùng:**

> Hãy xây dựng một website giới thiệu và gợi ý phim có tên CineVerse, giao diện tiếng Việt, phong cách điện ảnh hiện đại, nền tối, điểm nhấn màu xanh neon. Website cần responsive trên máy tính và điện thoại. Hãy sử dụng HTML5 semantic với header, nav, main, section/article và footer; CSS Variables trong :root để quản lý màu sắc, font và khoảng cách; Flexbox hoặc Grid cho layout. Tạo hero section, danh sách phim nổi bật, phần giới thiệu, nhóm thể loại và form đăng ký nhận tin. Tách mã thành index.html, style.css và script.js. Tích hợp Animate.css và AOS, có hover/focus rõ ràng, dễ đọc và có cấu trúc mã sạch.

**Kết quả mong muốn:** Website có cấu trúc rõ ràng, thẩm mỹ nhất quán, có thể chạy trực tiếp trên trình duyệt và triển khai bằng GitHub Pages.

## 2. Quá trình tinh chỉnh & Giải quyết sự cố (Iteration Iterations)

### Lần 1: Dựng khung Semantic HTML & CSS Variable

- **Prompt đã dùng:**

  > Kiểm tra cấu trúc HTML và bảo đảm sử dụng đúng ngữ nghĩa. Dùng header cho đầu trang, nav cho điều hướng, main cho nội dung chính, section cho từng khu vực và footer cho chân trang. Hạn chế dùng div nếu không cần thiết. Tạo các biến CSS trong :root cho màu nền, màu chữ, màu nhấn, font, khoảng cách và bo góc.

- **Kết quả AI tạo ra:** Tạo các vùng nội dung gồm trang chủ, phim nổi bật, giới thiệu CineVerse, thể loại phim, đăng ký nhận tin và chân trang. Các màu và kiểu chữ được quản lý tập trung bằng CSS Variables.
- **Nhận xét & tinh chỉnh của SV:** Kiểm tra các thẻ ngữ nghĩa, bổ sung nhãn truy cập cho điều hướng và form; dùng Grid cho danh sách phim và thể loại, dùng Flexbox cho thanh điều hướng và nhóm nút.

### Lần 2: Tích hợp thư viện Animate.css & AOS

- **Prompt đã dùng:**

  > Tích hợp Animate.css cho tiêu đề và nội dung hero khi tải trang. Tích hợp AOS cho các section và thẻ phim khi cuộn. Đảm bảo nạp CSS thư viện trong head, nạp JavaScript AOS trước script.js và khởi tạo AOS sau khi DOM sẵn sàng. Chỉ dùng hiệu ứng vừa phải, tránh gây rối mắt.

- **Kết quả AI tạo ra:** Tiêu đề hero dùng các class animate__animated; những phần nội dung khác sử dụng data-aos và được khởi tạo bằng AOS.init.
- **Thách thức gặp phải:** Hiệu ứng AOS có thể không xuất hiện nếu thư viện không tải được do mất kết nối Internet hoặc CDN bị chặn.
- **Cách sửa prompt (Debug prompt):**

  > Kiểm tra thứ tự tải thư viện AOS và script.js. Khởi tạo AOS khi DOMContentLoaded, đồng thời kiểm tra window.AOS trước khi gọi AOS.init để tránh lỗi JavaScript nếu CDN không khả dụng.

- **Nhận xét & tinh chỉnh của SV:** Kiểm tra trang khi cuộn; giữ hiệu ứng ngắn, chỉ chạy một lần và thêm quy tắc prefers-reduced-motion để hỗ trợ người dùng nhạy cảm với chuyển động.

### Lần 3: Responsive và hoàn thiện UI/UX

- **Prompt đã dùng:**

  > Tối ưu giao diện cho màn hình dưới 900px và dưới 650px. Chuyển menu thành menu mở/đóng trên điện thoại, giảm kích thước poster, chuyển các khối nội dung sang một cột khi cần. Bổ sung trạng thái hover, focus-visible, nhãn form và bảo đảm chữ dễ đọc.

- **Kết quả AI tạo ra:** Bố cục thay đổi theo kích thước màn hình; menu điện thoại có thể mở/đóng; các nút và thẻ có hiệu ứng hover; trường email có nhãn dành cho công nghệ hỗ trợ.
- **Nhận xét & tinh chỉnh của SV:** Thử thu nhỏ cửa sổ trình duyệt, kiểm tra menu và liên kết neo, rà soát khoảng cách và khả năng đọc trên điện thoại.

### Lần 4: Kiểm tra tương tác và sửa lỗi

- **Prompt đã dùng:**

  > Kiểm tra JavaScript cho menu điều hướng và form đăng ký. Không để form tải lại trang. Hiển thị thông báo rõ ràng khi gửi thử và ghi chú đây là demo chưa kết nối backend. Tránh lỗi nếu AOS không tải được.

- **Kết quả AI tạo ra:** Menu cập nhật aria-expanded; khi nhấn liên kết menu tự đóng. Form hiển thị thông báo xác nhận demo và không gửi dữ liệu lên máy chủ.
- **Thách thức gặp phải:** Form giao diện tĩnh không thể lưu email thực tế nếu chưa có backend hoặc dịch vụ form.
- **Cách sửa prompt (Debug prompt):**

  > Giữ form ở chế độ demo, không giả vờ gửi email thật. Sau khi người dùng nhập email hợp lệ và nhấn đăng ký, hiển thị thông báo rằng dữ liệu chưa được gửi lên máy chủ.

- **Nhận xét & tinh chỉnh của SV:** Thử gửi form với trường trống và trường email hợp lệ; xác nhận thông báo xuất hiện đúng và trang không tải lại.


### Lần 5: Bổ sung chức năng khám phá phim

- **Prompt tinh chỉnh đề xuất:**

  > Nâng cấp website CineVerse thành trang khám phá phim có tương tác thực tế phía trình duyệt. Bổ sung tìm kiếm theo tên phim, lọc theo thể loại, sắp xếp theo điểm đánh giá hoặc tên, danh sách yêu thích và hộp thoại chi tiết. Cập nhật số lượng kết quả, trạng thái rỗng, nhãn ARIA và thông báo rõ ràng. Không giả lập dữ liệu backend hoặc tuyên bố lưu dữ liệu vĩnh viễn.

- **Kết quả trong phiên bản hiện tại:** Có tìm kiếm, lọc thể loại, sắp xếp, đánh dấu yêu thích trong phiên làm việc hiện tại, hộp thoại thông tin phim, đếm số phim yêu thích và nút quay lại đầu trang.
- **Giới hạn:** Dữ liệu phim và điểm số là nội dung minh họa; danh sách yêu thích chỉ lưu trong bộ nhớ của trang và sẽ mất khi tải lại. Form đăng ký chưa kết nối máy chủ.
- **Việc cần làm trước khi nộp:** Chạy thử tất cả chức năng trên trình duyệt và điều chỉnh nhật ký để phản ánh đúng những thao tác đã thực sự thực hiện.

## 3. Đánh giá cá nhân về quá trình Vibe Coding

### AI đã giúp tiết kiệm thời gian ở phần nào nhất?

AI giúp rút ngắn thời gian dựng cấu trúc HTML, xây dựng hệ thống màu bằng CSS Variables và tạo bố cục responsive. AI cũng gợi ý cách tích hợp Animate.css, AOS và viết JavaScript cho menu, form. Nhờ đó, tôi có thể dành thêm thời gian kiểm tra giao diện, sửa lỗi và hoàn thiện trải nghiệm người dùng.

### Bài học rút ra khi đặt câu hỏi (Prompt) cho AI trong thiết kế web?

Tôi nhận thấy prompt càng cụ thể về mục tiêu, cấu trúc file, công nghệ, bố cục và tiêu chí nghiệm thu thì kết quả càng sát yêu cầu. Không nên chỉ yêu cầu “làm website đẹp”; cần nêu rõ thẻ semantic bắt buộc, cách tổ chức CSS, responsive, thư viện hiệu ứng và hành vi tương tác. Sau mỗi lần AI tạo mã, cần chạy thử, kiểm tra lỗi và đưa prompt tiếp theo dựa trên lỗi thực tế thay vì chấp nhận kết quả ngay.

## 4. Checklist trước khi nộp

- [ ] Đã thay họ tên và MSSV ở đầu file này.
- [ ] Repository đặt đúng định dạng `Ten_Ho_MSSV`.
- [ ] Đã tải lên `index.html`, `style.css`, `script.js` và `PROMPT_LOG.md`.
- [ ] Đã mở website trên trình duyệt và kiểm tra giao diện máy tính/điện thoại.
- [ ] Đã kiểm tra tìm kiếm, lọc, sắp xếp, yêu thích, hộp thoại chi tiết, liên kết điều hướng, menu điện thoại và form demo.
- [ ] Đã bật GitHub Pages và kiểm tra link live ở chế độ công khai.
- [ ] Đã cập nhật nhật ký để phản ánh đúng quá trình làm bài thực tế.
