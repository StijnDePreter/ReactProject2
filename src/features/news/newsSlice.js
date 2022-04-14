import { createSlice, nanoid ,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '/' + mm + '/' + dd;


const initialState = {
  news:
  [{
    id: '1',
    title: "Foorkramers klaar voor eerste Geelse Palmenmarkt sinds corona: \"we staan te popelen\"",
    subtitle: "De Palmenmarkt, een van de grootste kermissen van de Kempen, vindt plaats van 8 tot en met 12 april.", 
    date: "2022/04/08",
    content: "De Palmenmarkt in Geel, een van de grootste kermissen van de streek, mag na twee jaar weer de deuren openen. Van vrijdagavond tot en met dinsdag zullen er verschillende attracties in het centrum van Geel staan. De foorkramers zijn erg enthousiast om het weekend in te gaan. \"Na twee jaar staan we te popelen om eraan te beginnen. Generaties lang staan wij hier al. Het is altijd een drukke kermis geweest, heel de Kempen komt naar hier\", vertelt foorkramer Regina Meert. Prikkelarm moment Naar de kermis gaan is niet voor iedereen vanzelfsprekend. Daarom organiseert de Palmenmarkt op maandag 11 april tussen 16 en 18 uur een prikkelarm moment. De foorkramers zullen dan de geluid- en lichtprikkels van de attracties dempen zodat mensen met ADHD, autisme of hoogsensitiviteit ook de kans krijgen om rustig op de kermis rond te lopen. Het is de eerste keer dat de organisatie zo'n prikkelarm moment inlast. Meer informatie over de kermis en openingsuren zijn terug te vinden op de website van de stad Geel."
  },
  {
    id: '2',
    title: "27 nieuwe sportmonitoren in Bornem, gemeente leidt die zelf op: \"Uniek in Vlaanderen\"", 
    subtitle: "De gemeente leidt al 38 jaar haar eigen jeugdmonitoren op. Ze kunnen nu rekenen op zo'n 270 actieve monitoren.", 
    date: "2022/04/08",
    content: "In 1984 begon Bornem zelf met het opleiden van sportmonitoren. \"We vinden het belangrijk dat jongeren zich in hun vrije tijd niet vervelen\", zegt burgemeester Greet De bruyn (CD&V). \"Dus al sinds mijn eigen kindertijd is het aanbod hier in Bornem vrij groot. Het is ook altijd een prioriteit geweest om erin te investeren, vooral in de schoolvakanties. We zijn als lokaal bestuur dan ook blij dat er nog altijd genoeg jongeren zich willen engageren.\" Werken met vrijwilligers was leuk, maar ik verwachtte meer. Dan zijn we hen maar zelf beginnen op te leiden Marc Vlogaert, diensthoofd Sport Bornem Marc Vlogaert, het diensthoofd Sport in Bornem, is in 1984 begonnen met het organiseren van de opleiding binnen de gemeente. \"Het jaar ervoor had ik een sportkamp georganiseerd met vrijwilligers. Dat was tof, dat was leuk, maar ik voelde dat ik meer verwachtte. En dan hebben we maar beslist om zelf monitoren op te leiden. Intussen zijn al meerdere gemeentes komen kijken, hoe we dat doen, maar we zijn nog steeds uniek. We zijn nog steeds de enigen die zo'n opleiding organiseren.\" Theorie en praktijk De opleiding houdt zowel theorie als praktijk in. \"Dat gaat van waar je moet staan in een groep om uitleg te geven, wat het verschil is tussen een kleuter van 4 en een jongen van 12 en hoe je die moet aanpakken. Ze worden ook gewezen op de verantwoordelijkheden die ze hebben. Uiteraard zitten er ook sportgerelateerde onderwerpen bij. Ze hebben bijvoorbeeld een rondleiding gekregen van de redders in ons zwembad. Daarbij kregen ze tips over waar ze precies moeten staan om goed toezicht te houden. Deze week oefenden ze met elkaar en volgende week kunnen ze stage lopen op een van de sportkampen.\" In Bornem kunnen ze nu rekenen op zo'n 270 actieve monitoren. Dat is niet meer zo vanzelfsprekend gezien het om vrijwilligerswerk gaat. \"Wanneer ze meewerken aan een sportkamp krijgen ze er wel een kleine vergoeding voor, maar voor het geld moeten ze het niet doen. Dat ze dan toch een deel van hun vakantie opofferen, geeft me een warm gevoel en hoop voor de toekomst.\" Dit voelt niet aan als werken Jules Denotté, nieuwe sportmonitor \"Dit is gewoon een toffe job voor in de vakantie\", zegt Jules Denotté, die net zijn diploma kreeg. \"Ik hou ook van sport, omdat je in beweging blijft. Daarom sprak het mij zo aan. In de supermarkt moet je aan de kassa zitten of rekken vullen, terwijl dit niet aanvoelt aan werken. Hier mag ik met kinderen spelen én ik word er voor betaald.\" \"Het is fijn om met kinderen te werken en je legt als monitor ook veel sociale contacten\", vult Lauranne Boey aan. \"Je bent dikwijls met andere monitoren aan de slag, dus je moet samenwerken en dat vind je toch niet altijd in andere jobs. Ik kende hier niemand in het begin van de week en we zijn meteen vrienden geworden. We gaan zeker contact blijven houden.\""
  }],
  status: 'idle',
  error: null
}

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await axios.get("https://www.vrt.be/vrtnws/nl/regio/_jcr_content/par/grid.app.json")
  return response.data
})


export const newsSlice = createSlice({
  name: 'news',
  initialState, 
  reducers: {
    newsAdded: {
      reducer(state, action) {
        state.news.push(action.payload)
      },
      prepare(title,subtitle,content) {
        var id = nanoid(); 
 
        const payload = {
          id: id,
          title,
          subtitle,
          date: today ,
          content
        }

        //add data to local storage
        if (!localStorage.news) {
          localStorage.news = JSON.stringify([payload]);
        }else{
          const currentLocalStorage = JSON.parse(localStorage.news)
          currentLocalStorage.push(payload);
          localStorage.news = JSON.stringify(currentLocalStorage)
        }
        return {
          payload: payload
        }
      }
    },
    changeNews: (state, action) => {
      const {id,title,content} = action.payload;
      const existingNews = state.news.find(news => news.id === id)
      
      if(existingNews){
        existingNews.title = title;
        existingNews.content = content;
        
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add dates to news
        action.payload.forEach(article => {
          article.date = today
        });
        // Add any fetched news to the array
        state.news = state.news.concat(action.payload)

        //load data from local storage
        if (localStorage.news) {
          const currentLocalStorage = JSON.parse(localStorage.news)
          state.news = state.news.concat(currentLocalStorage)
        }
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { newsAdded, changeNews } = newsSlice.actions

export const selectAllNews = state => state.news.news;

export const selectLast10NewNews = state => 
  [...state.news.news]
    .sort((a, b) => b.date.localeCompare(a.date))  //sort on date
    .slice(0, 10) //show max 10 articles
    

export const selectNewsById = (state, newsId) =>
  state.news.news.find(newsArticle => newsArticle.id === newsId)

export default newsSlice.reducer;
