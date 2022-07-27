import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getImages } from './imageAPI';

export interface ImageState {
  value: any;
  selected: string
  status: 'loaded' | 'loading' | 'failed';
}

const initialState: ImageState = {
  value: [],
  selected: "",
  status: 'loading',
};

export const getAsyncImages = createAsyncThunk(
  'image/getAsyncImages',
  async () => {
    const response = await getImages();
    return response;
  }
);

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    selectImage: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAsyncImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAsyncImages.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.value += action.payload;
      })
      .addCase(getAsyncImages.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { selectImage } = imageSlice.actions;

export const imageStatus = (state: RootState) => state.image.status;
export const ImageSelected = (state: RootState) => state.image.selected;


export default imageSlice.reducer;
