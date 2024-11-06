let dailyBoxOfficeList = [];
let weeklyBoxOfficeList = [];
let genreMoviesList = [];
const menus = document.querySelectorAll("#menus div");
const movieMonth = document.querySelector(".movie-month");
const movieDay = document.querySelector(".movie-day");
const movieYear = document.querySelector(".movie-year");
const moviesSearch = document.querySelector(".movies-search");
const ApiKey = '987c2b75ca7cb1f553995f1ba1aa7d68';


// 전날 날짜 구하기
const getYesterdayDate = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  return today.toISOString().split('T')[0].replace(/-/g, '');
};
const formattedDate = getYesterdayDate();

// 장르별 검색
const genreSearch = async (event) => {
  const genreName = event.target.innerText;
  const randomDate = getRandomDate();
  const url = new URL(`http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=MNV6F23H4579I77P8U26&sort=prodYear,1&releaseDts=${randomDate}&genre=${genreName}`);
  document.getElementById("genre-section").innerHTML = `${genreName} `
  isInGenreMode = true;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.Data || data.Data.length === 0 || !data.Data[0].Result) {
      console.error("유효한 데이터가 아닙니다.", data);
      genreMoviesList = [];
      return;
    }

    genreMoviesList = data.Data[0].Result.slice(0, 6);
    genreRender();
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

// 랜덤 날짜 생성
const getRandomDate = () => {
  const startYear = 2004;
  const today = new Date();
  const endYear = today.getFullYear();
  const year = getRandomNumber(startYear, endYear);
  let month, day;

  if (year === endYear) {
    month = getRandomNumber(1, today.getMonth() + 1);
    day = month === today.getMonth() + 1 ? getRandomNumber(1, today.getDate() - 1) : getRandomNumber(1, new Date(year, month, 0).getDate());
  } else {
    month = getRandomNumber(1, 12);
    day = getRandomNumber(1, new Date(year, month, 0).getDate());
  }

  return `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// 일일 박스오피스 데이터 요청
const dayBoxOffice = async () => {
  const url = new URL(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${ApiKey}&targetDt=${formattedDate}`);
  try {
    const response = await fetch(url);
    const data = await response.json();
    dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
    slideRender();
  } catch (error) {
    console.error("일일 박스오피스 API 호출 중 오류 발생:", error);
  }
};

// 주간 박스오피스 데이터 요청
const weeklyBoxOffice = async (date) => {
  const url = new URL(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${ApiKey}&targetDt=${date}&weekGb=0&itemPerPage=6`);
  try {
    const response = await fetch(url);
    const data = await response.json();
    weeklyBoxOfficeList = data.boxOfficeResult.weeklyBoxOfficeList;
    moviesRender();
  } catch (error) {
    console.error("주간 박스오피스 API 호출 중 오류 발생:", error);
  }
};

// 영화 포스터 요청
const moviesPoster = async (title) => {
  const url = new URL(`http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=y&ServiceKey=MNV6F23H4579I77P8U26&title=${title}&sort=prodYear,1`);
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.Data[0]?.Result[0]?.posters.split("|")[0] || "https://cdn-icons-png.flaticon.com/512/11573/11573069.png";
  } catch (error) {
    console.error("포스터 API 호출 중 오류 발생:", error);
    return "https://cdn-icons-png.flaticon.com/512/11573/11573069.png";
  }
};

// 슬라이드 렌더링
const slideRender = async () => {
  const slideHTML = await Promise.all(dailyBoxOfficeList.map(async (movie, index) => {
    const isActive = index === 0 ? 'active' : '';
    const posterUrl = await moviesPoster(movie.movieNm);
    return `
      <div class="carousel-item ${isActive}" data-bs-interval="2000">
          <img src="${posterUrl}" class="d-block w-100" alt="${movie.movieNm}" />
          <div class="movies-data" onclick="moviesMore(event)">${movie.movieNm}</div>
      </div>
    `;
  }));
  document.querySelector(".carousel-inner").innerHTML = slideHTML.join('');
};

// 영화 렌더링
const moviesRender = async () => {
  const moviesHTML = await Promise.all(weeklyBoxOfficeList.map(async (movie) => {
    const posterUrl = await moviesPoster(movie.movieNm || movie.title);
    return `
      <div class="col-md-4 col-6">
          <img src="${posterUrl}" class="img-fluid" alt="${movie.movieNm}" />
          <div class="movies-data" onclick="moviesMore(event)">${movie.movieNm}</div>
      </div>
    `;
  }));
  document.getElementById("movies-board").innerHTML = moviesHTML.join('');
};

// 장르 영화 렌더링
const genreRender = async () => {
  const moviesHTML = await Promise.all(genreMoviesList.map(async (movie) => {
    const posterUrl = await moviesPoster(movie.title);
    return `
      <div class="col-md-4 col-6">
          <img src="${posterUrl}" class="img-fluid" alt="${movie.title}" />
          <div class="movies-data" onclick="moviesMore(event)">${movie.title}</div>
      </div>
    `;
  }));
  document.getElementById("movies-board").innerHTML = moviesHTML.join('');
};

// 영화 상세 정보 보기
const moviesMore = async (event) => {
  const movieName = event.target.innerText;
  const details = await fetchMovieDetails(movieName);
  const posterUrl = await moviesPoster(movieName);
  document.getElementById('modal-title').innerHTML = `<img src="${posterUrl}" alt="${movieName}" style="width: 220px;">`;
  document.getElementById('modal-details').innerText = details;
  document.getElementById('movie-modal').style.display = 'flex';
};

// 영화 상세 정보 요청
const fetchMovieDetails = async (movieName) => {
  const response = await fetch(`http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=y&ServiceKey=MNV6F23H4579I77P8U26&sort=prodYear,1&title=${movieName}`);
  const data = await response.json();
  const moviesDetail = data.Data[0].Result[0];
  const actorNm = [];
  moviesDetail.actors.actor.forEach((item) => {
    actorNm.push(item.actorNm);
  });
  return `영화명 : ${movieName}
          장르 : ${moviesDetail.genre}  
          감독 : ${moviesDetail.directors.director[0].directorNm}
          배우 : ${actorNm.join(', ')}
          등급 : ${moviesDetail.rating}
          상영시간 : ${moviesDetail.runtime}분
          국가 : ${moviesDetail.nation}
          회사 : ${moviesDetail.company}
          줄거리 : ${moviesDetail.plots.plot[0].plotText}`;
};

// 모달 닫기
const closeModal = () => {
  document.getElementById('movie-modal').style.display = 'none';
};

// 메뉴에 이벤트 리스너 추가
for (let i = 1; i < menus.length; i++) {
  menus[i].addEventListener("click", genreSearch);
}

// 인기 영화 버튼 클릭 시 초기 화면으로 돌아가기
menus[0].addEventListener("click", () => {
  document.getElementById("genre-section").innerHTML  = `<i class="fa-solid fa-magnifying-glass-arrow-right"></i> <input
          class="movie-year" type="text" placeholder="2024"> 년 <input class="movie-month" type="text"
          placeholder="10">월 <input class="movie-day" type="text" placeholder="4">주차 인기 영화` 
  weeklyBoxOffice(getLastSundayDate());
});

// 검색 기능
moviesSearch.addEventListener("click", () => {
  const year = parseInt(movieYear.value);
  const month = parseInt(movieMonth.value);
  const week = parseInt(movieDay.value);

  if (year > 2003 && year < 2100 && month >= 1 && month <= 12 && week >= 1 && week <= 5) {
    getDatesOfWeek(year, month, week);
  } else {
    movieMonth.value = "";
    movieDay.value = "";
    movieYear.value = "";
    alert("유효한 연도, 월(1-12), 주(1-5)를 입력하세요.\n(2004년부터 검색 가능합니다.)");
  }
});

// 주간 박스오피스 날짜 계산 및 호출
const getDatesOfWeek = (year, month, week) => {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const startOfWeek = (week - 1) * 7 - firstDayOfWeek + 1;

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(year, month - 1, startOfWeek + i);
    if (date.getMonth() === (month - 1)) {
      const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '');
      dates.push(formattedDate);
    }
  }
  weeklyBoxOffice(dates[0]);
};

// 전주 일요일 날짜 구하기
const getLastSundayDate = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 일요일은 0, 월요일은 1, ...
  const diff = dayOfWeek === 0 ? 7 : dayOfWeek; // 일요일이면 7일 빼기, 아니면 해당 요일만큼 빼기
  today.setDate(today.getDate() - diff);
  return today.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD 형식으로 반환
};



// 초기 데이터 로드
dayBoxOffice();
weeklyBoxOffice(getLastSundayDate());
