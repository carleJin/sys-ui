import Vue from 'vue'

Vue.directive('dragpin', {
    bind: function(el, binding, vnode){
        var position = ['top', 'right', 'bottom', 'left'].find(v => v === binding.arg) || 'top';

        el.onmousedown = function(e){
            let left = e.clientX - el.offsetLeft;
            let top = e.clientY - el.offsetTop;
            e.preventDefault();
            e.stopPropagation();

            document.onmousemove = function(e){
                document.onselectstart = () => {return false};
                if(['top', 'bottom'].indexOf(position) !== -1) {
                    el.style.left = e.clientX - left + 'px';
                }
                if(['right', 'left'].indexOf(position) !== -1) {
                    el.style.top = e.clientY - top + 'px';
                }
            }
            document.onmouseup = function(e){
                document.onselectstart = null;
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }
})