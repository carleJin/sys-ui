(function(){
    var dom = '<div id="pageReadyBox"> <div class="loading"><span></span><span></span><span></span><span></span><span></span></div> </div>';
    document.write(dom);
    document.onreadystatechange = function completeLoading() {
        if (document.readyState == "complete") {
            var childNode = document.getElementById('pageReadyBox');
            if(childNode.parentNode) {
                childNode.style.opacity = 0;
                setTimeout(function() {
                    childNode.parentNode.removeChild(childNode);
                }, 1000)
            }
        }
    };
})()