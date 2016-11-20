window.onload = function() {
    var p = 1000,
        swingyDuration = 500;

    $(".swingy").bind("mouseenter", function() {
        if($(this).data("locked") == 1) {
            return;
        }

        $(this).data("locked", 1).transition({
            perspective: p,
            duration: swingyDuration/4,
            rotateX: "-30deg"
        }).transition({
            perspective: p,
            duration: swingyDuration,
            rotateX: "30deg"
        }).transition({
            perspective: p,
            duration: swingyDuration,
            rotateX: "-15deg"
        }).transition({
            perspective: p,
            duration: swingyDuration,
            rotateX: "5deg"
        }).transition({
            perspective: p,
            duration: swingyDuration,
            rotateX: "0deg",
            complete: function() {
                $(this).data("locked", 0);
            }
        });
    });



    $("section").each(function() {
        $(this).data("x", $(this).offset().left);
    });
    


    $("nav a, .to-prev, .to-home, .to-next").click(function(e) {
        e.preventDefault();

        var href = $(this).attr("href"),
            easing = href == "#contact"  || href == "#" ? "easeOutQuad" : "easeOutElastic",
            $el = $(href),
            x = $el ? $el.data("x") : 0;

        $("#wrapper").animate({
            "scrollLeft": x
        }, 3000, easing);

        return false;
    });

    var $form = $("#contact form"),
        showAlert = function() {
            if($("#alerts").data("locked") == 1) {
                return;
            }

            $("#alerts").data("locked", 1).css({
                top: "-400px"
            }).animate({
                top: "0px"
            }, 2000, "easeOutBounce").delay(2000).animate({
                top: "-400px"
            }, 1000, "easeInQuad", function() {
                $("#alerts").data("locked", 0);
            });
        };

    $form.submit(function(e) {
        e.preventDefault();

        var msg = $("#form-message").val(),
            email = $("#form-email").val();

        $.ajax($form.attr("action"), {
            type: $form.attr("method"),
            data: {
                message: msg,
                email: email
            }
        }).done(function() {
            showAlert();
            $("#alerts .success").show();
            $("#alerts .error").hide();
        }).fail(function() {
            showAlert();
            $("#alerts .success").hide();
            $("#alerts .error").show();
        });

        return false;
    });



    var scrollMultiplier = 20;
    $(document).mousewheel(function(e, delta) {
        $("#wrapper").scrollLeft($("#wrapper").scrollLeft() -  (delta * scrollMultiplier));
    
        e.preventDefault();
    });



    $(".top .layer").data("depth", "1");
    $(".middle .layer").data("depth", ".75");
    $(".bottom .layer").data("depth", ".5");

    $(".top, .middle, .bottom").parallax({
        limitY: 0
    });
};