// This filter hightlights the text being searched in the matched results
app.filter('highlight', function($sce) {
    return function(text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
            '<span class="blue-text">$1</span>')
        return $sce.trustAsHtml(text)
    }
})
