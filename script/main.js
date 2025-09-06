// trigger to play music in the background with sweetalert
window.addEventListener('load', () => {
    // Mark prompt active to hide unnecessary text until user decides
    document.body.classList.add('prompt-active');
    Swal.fire({
        title: 'Bật nhạc hài hước không? 🎵',
        text: 'Nghe cho vui tai, không thích thì tắt liền!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Bật đi',
        cancelButtonText: 'Để sau',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('.song').play();
            animationTimeline();
        } else {
            animationTimeline();
        }
        // Reveal content once decision is made
        document.body.classList.remove('prompt-active');
    });

    // Fun mode removed
    // Safety: if SweetAlert fails to show/resolve, reveal content after 3s
    setTimeout(() => document.body.classList.remove('prompt-active'), 3000);
});


// animation timeline
const animationTimeline = () => {
    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    // Split element content into spans per character while preserving <br> and inline elements
    function splitIntoSpans(node) {
        const frag = document.createDocumentFragment();
        node.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent;
                for (const ch of text) {
                    if (ch === '\n') {
                        frag.appendChild(document.createElement('br'));
                    } else {
                        const span = document.createElement('span');
                        span.textContent = ch;
                        frag.appendChild(span);
                    }
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                if (child.tagName === 'BR') {
                    frag.appendChild(document.createElement('br'));
                } else {
                    const clone = child.cloneNode(false);
                    clone.appendChild(splitIntoSpans(child));
                    frag.appendChild(clone);
                }
            }
        });
        return frag;
    }

    // Replace content with spanned characters (preserve <br> and inline tags)
    const chatClone = textBoxChars.cloneNode(true);
    textBoxChars.innerHTML = '';
    textBoxChars.appendChild(splitIntoSpans(chatClone));

    const hbdClone = hbd.cloneNode(true);
    hbd.innerHTML = '';
    hbd.appendChild(splitIntoSpans(hbdClone));

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // timeline
    const tl = new TimelineMax();

        // Ensure we can reveal beyond minimal-start
        tl.call(function(){ document.body.classList.remove('minimal-start'); })
            .to(".container", 0.2, { visibility: "visible" })
    // Slow intro
    .from(".one", 1.0, {
        opacity: 0,
        y: 10
    })
    // Fade out heading a bit slower, then greet shows gently
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=0.45")
    .from(".two", 0.9, {
        opacity: 0,
        y: 10
    })
    // keep greeting visible, then move on
    .to(".two", 0.6, { opacity: 0, y: 10 }, "+=3.2")
    // Faster pace for later sections
    .from(".three", 0.5, {
        opacity: 0,
        y: 10
    })
    .to(".three",
        0.5,
        {
            opacity: 0,
            y: 10
        },
    "+=2.2")
    .from(".four", 0.5, {
        scale: 0.2,
        opacity: 0,
    })
    .from(".fake-btn", 0.25, {
        scale: 0.2,
        opacity: 0,
    })
    .staggerTo(
        ".hbd-chatbox span",
        1.0, {
            visibility: "visible",
        },
        0.04
    )
    .to(".fake-btn", 0.1, {
        backgroundColor: "rgb(127, 206, 248)",
    },
    "+=4")
    .to(
        ".four",
        0.45, {
            scale: 0.2,
            opacity: 0,
            y: -150
        },
    "+=0.8")
    // Gag scenes sequence
    .from('.gag-1', 0.5, { opacity: 0, y: 12 })
    .to('.gag-1', 0.4, { opacity: 0, y: -10 }, "+=1.8")
    .from('.gag-2', 0.5, { opacity: 0, y: 12 })
    .call(function(){
        const items = ['Bánh kem xịn', 'Đi chơi vui', 'Ảnh chụp đẹp', 'Điều ước to'];
        const el = document.querySelector('.gag-2 .slot');
        if (!el) return;
        let i = 0; const max = 12; const spin = setInterval(() => {
            el.textContent = items[i % items.length]; i++;
            if (i > max) { clearInterval(spin); el.textContent = 'Niềm vui bất ngờ'; }
        }, 120);
    })
    .to('.gag-2', 0.4, { opacity: 0, y: -10 }, "+=1.8")
    .from('.gag-3', 0.5, { opacity: 0, y: 12 })
    .to('.gag-3 .badge', 0.5, { scale: 1.08 }, 0)
    .to('.gag-3', 0.4, { opacity: 0, y: -10 }, "+=1.8")
    .from([".idea-1"], 0.001, { autoAlpha: 0 })
    .from(".idea-1", 0.6, ideaTextTrans)
    .to(".idea-1", 0.5, ideaTextTransLeave, "+=2.1")
    .from([".idea-2"], 0.001, { autoAlpha: 0 })
    .from(".idea-2", 0.6, ideaTextTrans)
    .to(".idea-2", 0.5, ideaTextTransLeave, "+=2.1")
    .from([".idea-3"], 0.001, { autoAlpha: 0 })
    .from(".idea-3", 0.6, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: "rgb(21, 161, 237)",
        color: "#fff",
    })
    .to(".idea-3", 0.5, ideaTextTransLeave, "+=2.1")
    .from([".idea-4"], 0.001, { autoAlpha: 0 })
    .from(".idea-4", 0.6, ideaTextTrans)
    .to(".idea-4", 0.5, ideaTextTransLeave, "+=2.1")
    .from([".idea-5"], 0.001, { autoAlpha: 0 })
    .from(
    ".idea-5",
    0.6, {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
        },
        "+=1.5"
    )
    .to(
        ".idea-5 span",
        0.7, {
            rotation: 90,
            x: 8,
        },
        "+=1.4"
    )
    .to(
    ".idea-5",
    0.5, {
            scale: 0.2,
            opacity: 0,
        },
        "+=2"
    )
    .from([".idea-6"], 0.001, { autoAlpha: 0 })
    .staggerFrom(
        ".idea-6 span",
        0.7, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut,
        },
        0.2
    )
    .staggerTo(
        ".idea-6 span",
        0.7, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut,
        },
        0.2,
        "+=1.5"
    )
    // Balloons: skip in clean mode
    .call(function(){
        if (!document.body.classList.contains('clean')) {
            TweenMax.staggerFromTo(
                ".baloons img",
                2.5, {
                    opacity: 0.9,
                    y: 1400,
                }, {
                    opacity: 1,
                    y: -1000,
                },
                0.2
            );
        }
    })
    .from([".six"], 0.001, { autoAlpha: 0 })
    .from(
        ".profile-picture",
        0.4, {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
        },
        "-=2"
    )
    .to([".photo-chip", ".photo-caption"], 0.5, { opacity: 1, y: 0, clearProps: 'transform' }, "-=1.4")
    .from(".hat", 0.5, {
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0,
    })
    .staggerFrom(
        ".wish-hbd span",
        0.6, {
            opacity: 0,
            y: -30,
            rotation: 120,
            skewX: "20deg",
            ease: Elastic.easeOut.config(1, 0.5),
        },
        0.08
    )
    .staggerFromTo(
        ".wish-hbd span",
        0.6, {
            scale: 1.25,
            rotationY: 120,
        }, {
            scale: 1,
            rotationY: 0,
            color: document.body.classList.contains('clean') ? "#222" : "#ff69b4",
            ease: Expo.easeOut,
        },
        0.08,
        "party"
    )
    .from(
        ".wish h5",
        0.4, {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
        },
        "party"
    )
    // Confetti bubbles: skip in clean mode
    .call(function(){
        if (!document.body.classList.contains('clean')) {
            TweenMax.staggerTo(
                ".eight svg",
                1.5, {
                    visibility: "visible",
                    opacity: 0,
                    scale: 80,
                    repeat: 3,
                    repeatDelay: 1.4,
                },
                0.3
            );
        }
    })
    .to(".six", 0.5, {
        opacity: 0,
        y: 30,
        zIndex: "-1",
    })
    .from([".nine"], 0.001, { autoAlpha: 0 })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
        ".last-smile",
        0.45, {
            rotation: 0,
            y: 0,
            opacity: 1,
            transformOrigin: 'center center'
        },
        "+=1"
    )
    // End sequence finishes here; navigation to surprise page only happens on explicit click
    ;

    // Restart Animation on click
    // Do not attach click to entire paragraph; only the final link should navigate
}
