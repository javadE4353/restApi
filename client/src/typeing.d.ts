export interface Genre {
    id: number
    name: string
  }

  export interface Movies {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    media_type?: string
    movieid?:number | null 
    username?:string | null 
    createdAt: string | null
  }
  export interface Userinfo{
    role:string ,
    id:number 
    username:string ,
    accessToken:string 
}


export interface CommentType{
  movieid:number | null
  username:string | undefined
  movietitle:string | undefined
  content:string | undefined
  createdAt?:string | undefined
  ratings:number | null
}
export interface Ratings{
  username:string | undefined
  movietitle:string | undefined
  date?:string | undefined
  ratings:number | null
}

interface Roles{
  name:string
}

export interface Users{
  username:string
  image:string
  mobile:string
  roleuser:string
  email:string
  date?:string
  roles:Roles[] 
  createdAt:string
  updatedAt:string
  password:string
  id:number
  profile:string
}

export interface NewUser{
  username:string
  image:string
  mobile:string
  roleuser:string
  email:string
  password:string
  profile:string
}
export interface Payment{
  username:string
  month:string
  status:boolean
  mobile:string,
  email:string,
  account:string
  userid:number
}
  
  export interface Element {
    type:
      | 'Bloopers'
      | 'Featurette'
      | 'Behind the Scenes'
      | 'Clip'
      | 'Trailer'
      | 'Teaser'
  }