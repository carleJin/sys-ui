(function(){
    var dom = '<div id="pageReadyBox"> <span></span><span></span><span></span><span></span><span></span> </div>';
    document.write(dom);
    document.onreadystatechange = function completeLoading() {
        if (document.readyState == "complete") {
            var childNode = document.getElementById('pageReadyBox');
            if(childNode.parentNode) {
                childNode.parentNode.removeChild(childNode);
            }
        }
    };
})()