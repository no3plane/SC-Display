/*!
 * @description 简单的拖拽效果，兼容 IE 和 移动端，带边界判断
 * 相关内容：https://www.zhangxinxu.com/wordpress/?p=683
 * @author zhangxinxu(.com)
 * @create 2021-12-03
 * @license MIT
**/

/**
 * @param {Element} eleBar 拖拽触发元素
 * @param {Object} options 可选参数
 * @returns 
 */
export var zxxDrag = function (eleBar, options) {
    if (!eleBar) {
        return;
    }
    // 默认数据
    var defaults = {
        target: eleBar,
        bounding: window,
        edgeLock: true,
        onMove: function () {},
        onEnd: function () {}
    };

    options = options || {};

    var params = {};
    for (var key in defaults) {
        if (typeof options[key] != 'undefined') {
            params[key] = options[key];
        } else {
            params[key] = defaults[key];
        }
    }

    // 拖拽元素
    var eleTarget = params.target;
    // 限制范围
    var bounding = params.bounding;
    var objBounding = bounding;

    // 事件类型处理
    var objEventType = {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
    };

    if ('ontouchstart' in document) {
        objEventType = {
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend'
        };
    }

    // 坐标存储数据
    var store = {};
    eleBar.addEventListener(objEventType.start, function (event) {
        // IE 拖拽可能拖不动的处理
        if (!window.WeakMap || typeof document.msHidden != 'undefined') {
            event.preventDefault();
        }
        // 兼顾移动端
        if (event.touches && event.touches.length) {
            event = event.touches[0];
        }
        store.y = event.pageY;
        store.x = event.pageX;
        store.isMoving = true;
        store.top = parseFloat(getComputedStyle(eleTarget).top) || 0;
        store.left = parseFloat(getComputedStyle(eleTarget).left) || 0;

        if (params.edgeLock === true && bounding) {
            if (bounding === window) {
                objBounding = {
                    left: 0,
                    top: 0,
                    bottom: innerHeight,
                    right: Math.min(innerWidth, document.documentElement.clientWidth)
                };
            } else if (bounding.tagName) {
                objBounding = bounding.getBoundingClientRect();
            }

            // 拖拽元素的 bounding 位置
            var objBoundingTarget = eleTarget.getBoundingClientRect();

            // 可移动范围
            store.range = {
                y: [objBounding.top - objBoundingTarget.top, objBounding.bottom - objBoundingTarget.bottom],
                x: [objBounding.left - objBoundingTarget.left, objBounding.right - objBoundingTarget.right]
            };
        }
    });
    document.addEventListener(objEventType.move, function (event) {
        if (store.isMoving) {
            event.preventDefault();
            // 兼顾移动端
            if (event.touches && event.touches.length) {
                event = event.touches[0];
            }            

            var distanceY = event.pageY - store.y;
            var distanceX = event.pageX - store.x;
            
            // 边界的判断与chuli
            if (params.edgeLock === true && bounding) {
                var minX= Math.min.apply(null, store.range.x);
                var maxX = Math.max.apply(null, store.range.x);
                var minY= Math.min.apply(null, store.range.y);
                var maxY = Math.max.apply(null, store.range.y);

                if (distanceX < minX) {
                    distanceX = minX;
                } else if (distanceX > maxX) {
                    distanceX = maxX;
                }

                if (distanceY < minY) {
                    distanceY = minY;
                } else if (distanceY > maxY) {
                    distanceY = maxY;
                }
            }
            
            var top = store.top + distanceY;
            var left = store.left + distanceX;

            eleTarget.style.top = top + 'px';
            eleTarget.style.left = left + 'px';

            // 回调
            params.onMove(left, top);
        }
    }, {
        passive: false
    });
    document.addEventListener(objEventType.end, function () {
        if (store.isMoving) {
            store.isMoving = false;

            params.onEnd();
        }            
    });
};
