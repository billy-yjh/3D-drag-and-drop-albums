//旋转分散 点击拖拽 旋转效果

init();

function init() {
    var img = $('img');
    var len = img.length;
    var deg = 360 / len;
    for (var i = 0; i < len; i++) {
        $(img[i]).css({
            transform: 'rotateY(' + i * deg + 'deg) translateZ(350px)',
            transition: 'transform 1s ' + (len - i - 1) * 0.1 + 's'
        })
    }
    bindEvent()
}

function bindEvent() {
    //拖拽
    var box = $('.box');
    var body = $('body');
    var lastX, lastY, nowX, nowY, disX, disY, roX = 0,
        timer,
        roY = 0;
    body.on('mousedown', function (e) {
        //上一点坐标
        lastX = e.clientX;
        lastY = e.clientY;
        clearInterval(timer);
        body.on('mousemove', function (e) {
            //当前这一点
            nowX = e.clientX;
            nowY = e.clientY;
            //点的差值
            disX = nowX - lastX;
            disY = nowY - lastY;
            //根据距离 控制旋转
            //下---》上  disY(负数)  角度要正值
            roX -= disY * 0.2;
            roY += disX * 0.2;
            box.css({
                transform: 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)',
            })
            lastX = nowX;
            lastY = nowY;

        });
        body.on('mouseup', function () {
            //移除鼠标move事件
            body.off('mousemove');
            clearInterval(timer)
            timer = setInterval(function () {
                disX = disX * 0.98;
                disY = disY * 0.98;
                roX -= disY * 0.2;
                roY += disX * 0.2;
                box.css({
                    transform: 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)',
                })
            }, 20);
            if (Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1) {
                clearInterval(timer);
            }

        });
        //取消默认事件
        return false;
    })
}