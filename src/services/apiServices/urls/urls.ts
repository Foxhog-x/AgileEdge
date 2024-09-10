 

// const baseDomain = import.meta.env.VITE_LOCAL_URL;  ///FOR DEVELOPEMENT PURPOSE
 const baseDomain = import.meta.env.VITE_BASE_URL; //PRODUCTION
export const urls = {
  baseUrl: `${baseDomain}`,
  memberLogin: `${baseDomain}/member/login`,
  createMember:`${baseDomain}/member/create-member`,
  createProject: `${baseDomain}/projects/create-project`,
  getAllProject: `${baseDomain}/projects/get-projects`,
  deleteProject: `${baseDomain}/projects/delete-project`,
  editProject: `${baseDomain}/projects/edit-name`,
  fetchAllContents: `${baseDomain}/projects/fetch-all-contents`,
  addColumn: `${baseDomain}/columns/add`,
  moveColumn: `${baseDomain}/columns/move`,
  getEvents: `${baseDomain}/cal/get`,
  saveEvent: `${baseDomain}/cal/create-event`,
  deleteEvent: `${baseDomain}/cal/delete-event`,
  fetchOnline: `${baseDomain}/fetch-online`,
  createCard: `${baseDomain}/cards/create`,
  moveCardInternal: `${baseDomain}/cards/move-internal`,
  moveCardExternal: `${baseDomain}/cards/move-external`,
  deleteCard: `${baseDomain}/cards/delete`,
  quillCardSave:`${baseDomain}/cards/quill/description`,
  getQuillData:`${baseDomain}/cards/quill/get-description`,
  addSubTask: `${baseDomain}/sub-tasks/create`,
  getSubTasks: `${baseDomain}/sub-tasks/get`,
  deleteSubTask: `${baseDomain}/sub-tasks/delete`,
  updateSubTaskChecked: `${baseDomain}/sub-tasks/checked`,
  getAssignees: `${baseDomain}/assign/get-assign-members`,
  addAssignees: `${baseDomain}/assign/update-assign`,
  removeAssignee: `${baseDomain}/assign/delete-assignee`,
  getUserProfile: `${baseDomain}/my/get-profile`,
  myUserUpdate: `${baseDomain}/my/update-user-profile`,
  getAvatars: `${baseDomain}/avatar/fetch-avatars`,
  getUserAvatar: `${baseDomain}/avatar/fetch-user-avatar`,
  getTaskProgress: `${baseDomain}/analytics/get-task-progress`,
  getTodaysEvents:`${baseDomain}/cal/today-events-list`, 
  updateEvent:`${baseDomain}/cal/update-event`,
  getTaskAnalytics:`${baseDomain}/analytics/get-task-analytics`
};
