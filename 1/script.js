
const playlist = [
  { title: "Track 1 - Chill Vibes", src: "music/track1.mp3" },
  { title: "Track 2 - Coffee Break", src: "music/track2.mp3" },
  { title: "Track 3 - Sunset Jam", src: "music/track3.mp3" }
];

let currentTrack = 0;
const audioPlayer = document.getElementById('audio-player');
const nowPlaying = document.getElementById('now-playing');
const playlistUI = document.getElementById('playlist');

function loadTrack(index, play = true) {
  currentTrack = index;
  audioPlayer.src = playlist[index].src;
  nowPlaying.innerText = "Now Playing: " + playlist[index].title;
  highlightCurrentTrack();
  if (play) audioPlayer.play();
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
}

function highlightCurrentTrack() {
  const items = playlistUI.querySelectorAll('li');
  items.forEach((item, idx) => {
    if (idx === currentTrack) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Build Playlist UI
playlist.forEach((track, index) => {
  const li = document.createElement('li');
  li.innerText = track.title;
  li.onclick = () => loadTrack(index);
  playlistUI.appendChild(li);
});

audioPlayer.addEventListener('ended', nextTrack);

// Auto load first track
loadTrack(currentTrack, false);
