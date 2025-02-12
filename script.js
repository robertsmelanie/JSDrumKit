const playingSounds = {}; // Object to store currently playing sounds

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

function playOrStopSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    if (playingSounds[e.keyCode]) {
        // If the sound is playing, stop it
        playingSounds[e.keyCode].pause();
        playingSounds[e.keyCode].currentTime = 0;
        delete playingSounds[e.keyCode]; // Remove from active sounds
        key.classList.remove('playing');
    } else {
        // Otherwise, play it
        audio.currentTime = 0;
        audio.play();
        playingSounds[e.keyCode] = audio; // Store it in the object
        key.classList.add('playing');

        // Remove from active sounds when it ends
        audio.onended = () => {
            delete playingSounds[e.keyCode];
            key.classList.remove('playing');
        };
    }
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playOrStopSound);