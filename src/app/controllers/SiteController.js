const Order = require('../models/Order');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    home(req, res, next) {
        const comment = [
            {
                avatar: '/image/a10.jpg',
                username: 'nam***tl',
                content: 'Shop bán rẻ hơn chỗ khác, dùng cho đôi da nâu này oke, khác rõ rệt.',
                image: ['/image/e1.png', '/image/e2.png', '/image/e3.png'],
            },
            {
                avatar: '/image/u1.jpg',
                username: 'huye**99',
                content: 'Em đã sử dụng cho đôi giầy da cũ và kết quả ảo thật. Nó sáng bóng, đi ra ngoài tự tin hẳn',
                image: ['/image/c1.png', '/image/c2.png', '/image/c3.png'],
            },
            {
                avatar: '/image/u2.jpg',
                username: 'nga***x7',
                content: 'Dùng ngon phết, giày đang bạc phếch lôi ra đánh cái mới bóng loáng luôn',
                image: ['/image/c4.png', '/image/c5.png'],
            },
            {
                avatar: '/image/u3.jpg',
                username: 'anh***nn',
                content: 'Hôm rồi mình mua shop khác tận 150k. Ước được thấy shop này sớm hơn. Chất lượng sản phẩm quá tuyệt vời, giầy như mới',
                image: ['/image/c6.png', '/image/c7.png'],
            },
            {
                avatar: '/image/u4.jpg',
                username: 'lon***97',
                content: 'Alo ae, đáng mua đấy, nó còn có cả chống nước nữa, ảo thật',
                image: ['/image/c8.png', '/image/c9.png'],
            },
            {
                avatar: '/image/u5.jpg',
                username: 'xua***y7',
                content: 'Dễ sử dụng, tiện lợi, xài khá tốt ok nên mua',
                image: ['/image/c11.png', '/image/c12.png'],
            },
        ];
        res.render('home', { cssPath: 'home.css', comment });
    }
    getOrder(req, res, next) {
        res.render('order-confirm');
    }
    order(req, res, next) {
        const order = new Order({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            products: req.body.product,
            status: 'Pending',
        });
        order
            .save()
            .then(() => res.redirect('/xac-nhan-dat-hang'))
            .catch(next);
    }
    getListOrder(req, res, next) {
        const perPage = 20; // Số lượng đơn hàng trên mỗi trang
        const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1

        // Đếm tổng số bản ghi trong cơ sở dữ liệu
        Order.countDocuments({})
            .then((totalOrders) => {
                // Tính toán số lượng trang
                const totalPages = Math.ceil(totalOrders / perPage);
                console.log({
                    currentPage: Number(page), // Trang hiện tại
                    hasNextPage: page < totalPages, // Kiểm tra xem có trang tiếp theo không
                    hasPreviousPage: page > 1, // Kiểm tra xem có trang trước đó không
                    nextPage: +page + 1, // Trang tiếp theo
                    previousPage: +page - 1, // Trang trước đó
                    lastPage: totalPages, // Tổng số trang
                });
                // Tìm các đơn hàng trong trang hiện tại
                Order.find({})
                    .sort({ createdAt: -1 })
                    .skip((page - 1) * perPage) // Bỏ qua (skip) các đơn hàng ở trang trước
                    .limit(perPage) // Giới hạn số lượng đơn hàng trên mỗi trang
                    .then((orders) => {
                        res.render('admin/order', {
                            orders: mutipleMongooseToObject(orders),
                            currentPage: Number(page), // Trang hiện tại
                            hasNextPage: page < totalPages, // Kiểm tra xem có trang tiếp theo không
                            hasPreviousPage: page > 1, // Kiểm tra xem có trang trước đó không
                            nextPage: +page + 1, // Trang tiếp theo
                            previousPage: +page - 1, // Trang trước đó
                            lastPage: totalPages, // Tổng số trang
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    }

    deleteOrder(req, res, next) {
        Order.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    updateOrder(req, res, next) {
        Order.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new SiteController();
