import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setItem, getItem } from '../../utils/storage';
import { publicPost } from '../../utils/axios';
const sliceName = 'user';

export const fetchUserStatus = createAsyncThunk(
  `${sliceName}/fetchUserStatus`,
  async () => {
    const status = await getItem('userStatus');
    const token = await getItem('accessToken');
    const refreshToken = await getItem('refreshToken');

    if(token){
      try{
        await publicPost("token/verify/", {"token": JSON.parse(token)});
        return true;
        
      } catch (err) {
        const refreshTokenData = await publicPost("token/refresh/", {"refresh": JSON.parse(refreshToken)});
        
        if(refreshTokenData?.access){
          setItem("accessToken", refreshTokenData?.access);
          return true;
        }else{
          return true;
        }

      }
    }
    return status !== null ? status : false;
    
  }
);

export const saveUserStatus = createAsyncThunk(
  `${sliceName}/saveUserStatus`,
  async (status, { rejectWithValue }) => {
    try {
      await setItem('userStatus', status);
      return status;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
      userSignUpData: {},
      stepsCount:0,
      userCoins: 0,
      userStatus: false,
      loading: false,
      error: null
    },
    reducers: {
      currentUserData: (state, action) => {
          state.userSignUpData = action.payload;
      },
      stepsCount: (state, action) => {
        state.stepsCount = action.payload;
      },
      userCoins: (state, action) => {
        state.userCoins = action.payload;
      }
    },
    extraReducers: (builder) => {
      builder
        // get logged in user value
        .addCase(fetchUserStatus.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserStatus.fulfilled, (state, action) => {
          state.loading = false;
          state.userStatus = action.payload;
        })
        .addCase(fetchUserStatus.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        // save logged in user value

        .addCase(saveUserStatus.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(saveUserStatus.fulfilled, (state, action) => {
          state.loading = false;
          state.userStatus = action.payload;
        })
        .addCase(saveUserStatus.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })


    }
});

export const { currentUserData, stepsCount, userCoins } = userSlice.actions;

export default userSlice.reducer;