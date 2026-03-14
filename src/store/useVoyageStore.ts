// Zustand 전역 상태 관리
// 설치 필요: pnpm add zustand
// import { create } from "zustand";
// import type { DateRange, Destination, DestinationDetail, Region, TripInfo } from "@/types";

// interface VoyageState {
//   // 날짜 범위
//   dateRange: DateRange;
//   setDateRange: (range: DateRange) => void;
//
//   // 여행 정보 (자동 계산)
//   tripInfo: TripInfo | null;
//
//   // 추천 목록
//   destinations: Destination[];
//   setDestinations: (destinations: Destination[]) => void;
//   isLoadingRecommendations: boolean;
//   setLoadingRecommendations: (loading: boolean) => void;
//
//   // 선택된 여행지
//   selectedDestination: Destination | null;
//   setSelectedDestination: (destination: Destination | null) => void;
//
//   // 상세 정보
//   destinationDetail: DestinationDetail | null;
//   setDestinationDetail: (detail: DestinationDetail | null) => void;
//   isLoadingDetail: boolean;
//   setLoadingDetail: (loading: boolean) => void;
//
//   // 지역 필터
//   activeRegion: Region;
//   setActiveRegion: (region: Region) => void;
// }

// export const useVoyageStore = create<VoyageState>((set) => ({
//   dateRange: { from: undefined, to: undefined },
//   setDateRange: (range) => set({ dateRange: range }),
//   tripInfo: null,
//   destinations: [],
//   setDestinations: (destinations) => set({ destinations }),
//   isLoadingRecommendations: false,
//   setLoadingRecommendations: (loading) => set({ isLoadingRecommendations: loading }),
//   selectedDestination: null,
//   setSelectedDestination: (destination) => set({ selectedDestination: destination }),
//   destinationDetail: null,
//   setDestinationDetail: (detail) => set({ destinationDetail: detail }),
//   isLoadingDetail: false,
//   setLoadingDetail: (loading) => set({ isLoadingDetail: loading }),
//   activeRegion: "all",
//   setActiveRegion: (region) => set({ activeRegion: region }),
// }));

export {};
