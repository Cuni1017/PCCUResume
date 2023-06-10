import { Vacancy } from "@/app/components/JobInfoCard";

export function getRecentlyViewedJobs(): Vacancy[] {
  const recentlyViewJobs = localStorage.getItem("recentlyViewJobs")
  return recentlyViewJobs ? JSON.parse(recentlyViewJobs) : []
}

export function setRecentlyViewedJob(jobArray: Vacancy[]) {
  localStorage.setItem("recentlyViewJobs", JSON.stringify(jobArray))
}

export function pushRecentlyViewedJob(job: Vacancy) {
  let newArray = getRecentlyViewedJobs();
  newArray.push(job)
  if (newArray.length > 6) {
    newArray.splice(0, 1)
  }
  setRecentlyViewedJob(newArray)
}