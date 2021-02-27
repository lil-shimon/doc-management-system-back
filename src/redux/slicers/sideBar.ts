import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IconProps = React.FC<{ className: string }>;

export type SidebarState = {
  sideBarOpened: boolean;
};

export const initialSidebarState: SidebarState = {
  sideBarOpened: true,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: initialSidebarState,
  reducers: {
    toggleSideBar(state, acttion: PayloadAction<boolean>) {
      state.sideBarOpened = acttion.payload;
    },
  },
});

export const { toggleSideBar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
