// METAR 정시관측보고 번역
export const windDataToKor = (parsedMetar) => {
  let result = ` 현재 바람은 ${
    parsedMetar.wind.degrees
      ? parsedMetar.wind.degrees + "°"
      : "평균풍향 측정이 불가한"
  } 방향에서 ${parsedMetar.wind.speed}${
    parsedMetar.wind.unit
  }의 세기로 불고 있으`;
  if (
    parsedMetar.wind.minVariation ||
    parsedMetar.wind.maxVariation ||
    parsedMetar.wind.gust
  ) {
    result += "나,";
    if (parsedMetar.wind.gust && parsedMetar.wind.minVariation) {
      result += ` 최고 ${parsedMetar.wind.gust}Kt 의 돌풍과 ${parsedMetar.wind.minVariation}°~${parsedMetar.wind.maxVariation}°사이의 변동을 가진 바람이 관측되니`;
    } else if (parsedMetar.wind.gust) {
      result += ` ${parsedMetar.wind.gust}Kt 의 돌풍이 관측되니`;
    } else if (parsedMetar.wind.minVariation) {
      result += ` ${parsedMetar.wind.minVariation}°~${parsedMetar.wind.maxVariation}° 사이의 변동을 가진 바람이 관측되니`;
    }
    result += " 주의가 필요합니다.";
  } else {
    result += "며, ";
  }
  return result;
};
export const visibilityToKor = (parsedMetar) => {
  const visibility = parsedMetar.visibility;
  let result = "현재 우세시정은 ";
  if (parsedMetar.cavok) {
    result += " 10km 이상이며, 운항상 장애요인이 없는 CAVOK ";
  } else if (visibility.value === 9999) {
    result += " 10km 이상";
  } else result += `${visibility.value}${visibility.unit}`;
  if (visibility.min) {
    result += `이며, 최소 시정은 ${
      visibility.min.direction ? `${visibility.min.direction}방향에서 ` : ""
    } ${visibility.min.value}m `;
  }
  result += "입니다. ";
  return result;
};
export const cloudToKor = (parsedMetar) => {
  const cloud = parsedMetar.clouds;
  let result = "";
  if (cloud.length !== 0 && cloud[0].quantity!=="NSC") {
    result += "현재 구름은 ";
    for (let i = 0; i < cloud.length; i++) {
      result += `${numberComma(cloud[i].height)}ft 높이에 ${cloud[i].quantity}구름`;
      if (i === cloud.length - 1) {
        result += "이 관측됩니다.";
      } else result += ", ";
    }

  } else if (parsedMetar.cavok || cloud.length === 0) {
    return;
  }else{return}
  return result;
};

// 숫자 메서드
export const randomNum =(min,max)=>{
  return Math.floor((Math.random()*(max-min))+min)
}

export const numberComma=(number)=>{
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

