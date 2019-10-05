let HTMLMoudle = function () {
    let $container = $('.container'),
        $header = $container.children('.header'),
        /* 导航 */
        $daohang = $('.daohang'),
        $daohangLis = $daohang.find('li');
    /* 第二层 */
    $lunbo = $('.lunbo'),
        $left = $lunbo.find('.left'),
        $imgs = $left.find('.imgs'),
        $list = $left.find('.list'),
        $liList = $list.find('li'),
        $right = $lunbo.find('.right'),
        $rigntTop = $right.find('.top'),
        $rigntBox = $right.find('.box'),
        $topList = $rigntTop.find('li'),
        $boxList = $rigntBox.find('div'),
        /* 第三层 */
        $sanlou = $('.sanlou'),
        $one = $sanlou.find('.one'),
        $oneLeft = $one.find('.left'),
        $oneTop = $oneLeft.find('.top'),
        $oneTopliList = $oneTop.find('li'),
        $oneItemBox = $oneLeft.find('.itemBox'),
        $oneItemList = $oneItemBox.find('.item'),
        /* 第四层 */
        $silou = $('.silou'),
        $siLeft = $silou.find('.siLeft'),
        $siTop = $siLeft.find('.top'),
        $siItemBox = $siLeft.find('.itemBox'),
        $siLiList = $siTop.find('li'),
        $siItems = $siItemBox.find('.item'),
        $siRight = $silou.find('.siRight'),
        $siR_Top = $siRight.find('.top'),
        $siR_LiList = $siR_Top.find('li'),
        $siR_ItemBox = $siRight.find('.itemBox'),
        $siR_left = $siRight.find('.btnLeft'),
        $siR_right = $siRight.find('.btnRight'),
        /* 第五层 */
        $wulou = $('.wulou'),
        $wuTop=$wulou.find('.top'),
        $wuLiList=$wuTop.find('li'),
        $wuItemBox=$wulou.find('.itemBox'),
        $wuItems=$wuItemBox.find('.item'),
        $pk=$wulou.find('.pk'),
        $wuUl=$pk.find('ul'),
        $wuLeft=$pk.find('.btnLeft'),
        $wuRight=$pk.find('.btnRight'),
        $wupai=$wulou.find('.pai'),
        $wupaiTop=$wupai.find('.paiTop'),
        $wupaiLilist=$wupaiTop.find('li'),
        $wupaiItemBox=$wupai.find('.paiItemBox'),
        $wupaiItems=$wupaiItemBox.find('.paiItem'),
        /* 第六层 */
        $liulou = $('.liulou'),
        $liuTop=$liulou.find('.top'),
        $liuLiList=$liuTop.find('li'),
        $liuItemBox=$liulou.find('.itemBox'),
        $liuItems=$liuItemBox.find('.item'),
        /* 第七层 */
        $qilou = $('.qilou');
    /* 导航栏 */
    function go() {
        let H1 = $sanlou.offset().top,
            H2 = $silou.offset().top,
            H3 = $wulou.offset().top,
            H4 = $liulou.offset().top,
            H5 = $qilou.offset().top;
        document.documentElement.style.transition = '1s linear'
        $daohangLis.eq(0).click(function () {
            document.documentElement.scrollTop = H1;
        });
        $daohangLis.eq(1).click(function () {
            document.documentElement.scrollTop = H2;
        });
        $daohangLis.eq(2).click(function () {
            document.documentElement.scrollTop = H3;
        });
        $daohangLis.eq(3).click(function () {
            document.documentElement.scrollTop = H4;
        });
        $daohangLis.eq(4).click(function () {
            document.documentElement.scrollTop = H5;
        });
        $daohangLis.eq(5).click(function () {
            document.documentElement.scrollTop = 0;
        });
        window.onscroll = function () {
            if (document.documentElement.scrollTop > H2) {
                $daohang.css('height', '360px');
                return;
            }
            $daohang.css('height', '300px');
        }
    }
    /* 顶部详细信息显示 */
    function list() {
        let $top = $header.children('.top'),
            $left = $top.children('.left'),
            $list = $header.children('.list');
        $(window).on('mousemove', function (ev) {
            $list.css('display', 'none');
        })
        $list.on('mousemove', function (ev) {
            $list.css('display', 'block');
            ev.stopPropagation();
        })
        let $ul = $left.find('ul'),
            ul = $ul.get(0),
            liList = ul.querySelectorAll('li');
        for (let i = 1; i < liList.length; i++) {
            liList[i].onmousemove = function (ev) {
                $list.css('display', 'block');
                ev.stopPropagation();
            }
        }
    }
    /* 第二层轮播图 */
    function imgMove() {
        let timer = null,
            step = 0, //初始显示的图片索引
            time = 3000;

        function autoMove() {
            step++;
            if (step >= 6) {
                //上一次显示的克隆的第一张，此时我们让其立即跳转到真实的第一张，让其运动到第二张即可
                $imgs.css('left', 0);
                step = 1;
            }
            $imgs.stop().animate({
                left: -step * 760
            }, 300, 'linear');
            //自动焦点对齐
            autoFocus()
        }
        //自动对焦
        function autoFocus() {
            let temp = step;
            temp === 5 ? temp = 0 : null;
            $liList.each((index, item) => {
                let $item = $(item);
                if (index == temp) {
                    $item.addClass('active');
                    return
                }
                $item.removeClass('active')
            })
        }
        //焦点对齐 点击哪个 跳转到哪个
        function handlerPagenition() {
            $liList.mouseenter(function () {
                let index = $(this).index();
                step = index;
                $imgs.stop().animate({
                    left: -step * 760
                }, 300, 'linear');
                autoFocus();
            })
        }
        timer = setInterval(autoMove, time);
        $left.on('mouseenter', () => clearInterval(timer)).on('mouseleave', () => timer = setInterval(autoMove, time));
        handlerPagenition();
    }
    /* 第二层选项卡 */
    function cardChange() {
        $topList.each((index, item) => {
            let $item = $(item);
            $item.on('mouseenter', function () {
                $item.addClass('active').siblings().removeClass('active');
                $boxList.eq(index).css('display', 'block').siblings().css('display', 'none')
            })
        })
    }
    /* 第三层选项卡 */
    function cardCangeTwo() {
        $oneTopliList.each((index, item) => {
            let $item = $(item);
            $item.on('mouseenter', function () {
                $item.addClass('active').siblings().removeClass('active');
                $oneItemList.eq(index).css('display', 'block').siblings().css('display', 'none')
            })
        })
    }
    /* 第四层选项卡 */
    function cardCangeSi() {
        $siLiList.each((index, item) => {
            let $item = $(item);
            $item.on('mouseenter', function () {
                $item.addClass('active').siblings().removeClass('active');
                $siItems.eq(index).css('display', 'block').siblings().css('display', 'none')
            })
        })
    }
    /* 第四层轮播图 */
    function cardCangeSi2() {
        let step = 0;
        $siR_LiList.each((index, item) => {
            let $item = $(item);
            $item.on('mouseenter', function () {
                $item.addClass('active').siblings().removeClass('active');
                $siR_ItemBox.css('left', -index * 500);
                step = index;
            });
            
        });
        $siR_right.click(jieliu(function () {
            step++;
            if (step >= 8) {
                $siR_ItemBox.css('transition', '');
                $siR_ItemBox.css('left', 0);
                $siR_ItemBox.outerHeight();
                step = 1;
            }
            $siR_ItemBox.css('transition', '0.5s linear');
            $siR_ItemBox.css('left', -step * 500);
            duiqi()

        }, 500));
        $siR_left.click(jieliu(function () {
            step--;
            if (step < 0) {
                $siR_ItemBox.css('transition', '');
                $siR_ItemBox.css('left', -3500);
                $siR_ItemBox.outerHeight();
                step = 6;
            }
            $siR_ItemBox.css('transition', '0.5s linear');
            $siR_ItemBox.css('left', -step * 500);
            duiqi()
        }, 500))

        function duiqi() {
            let a = step;
            a == 7 ? a = 0 : null;
            $siR_LiList.each((index, item) => {
                if (index == a) {
                    $(item).addClass('active');
                    return;
                }
                $(item).removeClass('active');
            })
        }

        function jieliu(func, wait) {
            let result = null,
                timer = null,
                oldtime = 0;
            return function (...arg) {
                let _this = this,
                    now = new Date,
                    jiange = wait - (now - oldtime);
                if (jiange <= 0) {
                    clearTimeout(timer);
                    timer = null;
                    oldtime = now;
                    func.call(_this, ...arg)
                } else if (!timer) {
                    timer = setTimeout(function () {
                        timer = null;
                        oldtime = new Date;
                        func.call(_this, ...arg)
                    }, jiange)
                }
            }
        }
    }
    /* 第五层选项卡 */
    function cardCangeWu(){
        $wuLiList.each((index, item) => {
            let $item = $(item);
            $item.on('mouseenter', function () {
                $item.addClass('active').siblings().removeClass('active');
                $wuItems.eq(index).css('display', 'block').siblings().css('display', 'none')
            })
        })
    }
    function cardCangeWu2(){
        $wupaiLilist.each((index, item) => {
            let $item = $(item);
            $item.on('mouseenter', function () {
                $item.addClass('active').siblings().removeClass('active');
                $wupaiItems.eq(index).css('display', 'block').siblings().css('display', 'none')
            })
        })
    }
    /* 第五层轮播图 */
    function LunWu(){
        let step=0;
        function panduan(){
            if(step==0){
                $wuLeft.css('display','none');
                return;
            }
            if(step==2){
                $wuRight.css('display','none');
                return;
            }
            $wuLeft.css('display','block');
            $wuRight.css('display','block');
        };
        panduan();
        $wuRight.click(function () {
            step++;
            if (step > 2) {
                step = 2;
            }
            $wuUl.css('transition', '0.5s linear');
            $wuUl.css('left', -step * 546.5);
            panduan();
        });
        $wuLeft.click(function () {
            step--;
            if (step < 0) {
                step = 0;
            }
            $wuUl.css('transition', '0.5s linear');
            $wuUl.css('left', -step * 546.5);
            panduan();
        })

    }
    /* 第六层选项卡 */
    function cardCangeLiu(){
        $liuLiList.each((index, item) => {
            let $item = $(item);
            $item.on('click', function () {
                $item.addClass('active').siblings().removeClass('active');
                $liuItems.eq(index).css('display', 'block').siblings().css('display', 'none')
            })
        })
    }
    return {
        init() {
            $header.css('height',$(window).outerHeight());
            $(window).scroll(function(){
                $header.css('transition','0.5s')
                $header.css('height','360px');
                if($(window).scrollTop()>$(window).outerHeight()){
                    $daohang.css('display','block')
                }else{
                    $daohang.css('display','none')
                }
            })
            /* 导航栏 */
            go()
            /* 一层 */
            list();
            /* 二层 */
            imgMove();
            cardChange();
            /* 三层 */
            cardCangeTwo();
            /* 四层 */
            cardCangeSi();
            cardCangeSi2();
            /* 五层 */
            cardCangeWu();
            cardCangeWu2();
            LunWu();
            /* 六层 */
            cardCangeLiu();
        }
    }
}()
HTMLMoudle.init()