import { derived, writable } from 'svelte/store';

const interestsArray = [
	{ value: 'smallSchool', label: 'Small School <5,000', preference: 'Super Important' },
	{ value: 'mediumSchool', label: 'Medium School 5,000-10,000', preference: 'Want it' },
	{ value: 'largeSchool', label: 'Large School >10,000', preference: 'No way!' },
	{ value: 'schoolSpirit', label: 'School Spirit', preference: 'Super Important' },
	{ value: 'sororitiesFraternities', label: 'Sororities/Fraternities', preference: 'No way!' },
	{ value: 'bigTimeAthletics', label: 'Big Time Athletics', preference: 'No way!' },
	{ value: 'goodFitnessFacilities', label: 'Good Fitness Facilities', preference: 'Want it' },
	{ value: 'clubSports', label: 'Club/Intramural Sports', preference: 'No way!' },
	{ value: 'lotsOfClubs', label: 'Lots of Clubs', preference: 'Super Important' },
	{ value: 'militaryAcademy', label: 'Military Academy', preference: 'No way!' },
	{ value: 'liberalCampus', label: 'Liberal Campus', preference: 'No way!' },
	{ value: 'conservativeCampus', label: 'Conservative Campus', preference: 'No way!' },
	{ value: 'diversity', label: 'Diversity', preference: 'Super Important' },
	{ value: 'thriveOnPressure', label: 'Thrive on Pressure', preference: 'Super Important' },
	{ value: 'strongCommunity', label: 'Strong Sense of Community', preference: 'Super Important' },
	{ value: 'scholarlyEnvironment', label: 'Scholarly Environment', preference: 'Super Important' },
	{ value: 'tolerant', label: 'Tolerant', preference: 'Super Important' },
	{ value: 'greenCampus', label: 'Environmentally Green Campus', preference: 'Super Important' },
	{ value: 'creativeCulture', label: 'Creative Culture', preference: 'Super Important' },
	{ value: 'politicallyAware', label: 'Politically Aware', preference: 'No way!' },
	{ value: 'urbanCampus', label: 'Urban Campus', preference: 'No way!' },
	{ value: 'suburbanCampus', label: 'Suburban Campus', preference: 'Want it' },
	{ value: 'ruralCampus', label: 'Rural Campus', preference: 'No way!' },
	{ value: 'closeToHome', label: 'Close to Home', preference: 'No way!' },
	{ value: 'farFromHome', label: 'Far from Home', preference: 'No way!' },
	{ value: 'outdoorsy', label: 'Outdoorsy', preference: 'No way!' },
	{ value: 'learningSupportServices', label: 'Learning Support Services', preference: 'No way!' },
	{ value: 'accessToProfessors', label: 'Access to Professors', preference: 'Super Important' },
	{ value: 'handsOnLearning', label: 'Hands-on Learning', preference: 'Super Important' },
	{ value: 'smallClasses', label: 'Small Classes', preference: 'Super Important' },
	{ value: 'bigFishSmallPond', label: 'Feeling like a big fish in a small pond', preference: 'No way!' },
	{ value: 'oneInACrowd', label: 'Feeling like one in a crowd', preference: 'No way!' },
	{ value: 'needBasedAid', label: 'Need-based financial aid', preference: 'Super Important' },
	{ value: 'meritBasedAid', label: 'Merit-based scholarships/aid', preference: 'Super Important' },
	{ value: 'researchOpportunities', label: 'Research opportunities', preference: 'Super Important' },
	{ value: 'internshipsCoopEd', label: 'Internships or Cooperative Education', preference: 'Super Important' },
	{ value: 'careerAdvising', label: 'Career Advising', preference: 'Super Important' },
	{ value: 'campusCulturalEvents', label: 'Campus/cultural events', preference: 'Want it' },
	{ value: 'honorsCollege', label: 'Honors College', preference: 'Super Important' },
	{ value: 'nationalReputation', label: 'National Reputation', preference: 'Super Important' },
	{ value: 'religiousAffiliation', label: 'Religious affiliation', preference: 'No way!' }
];

export const interests = writable(interestsArray);

export const readableInterests = derived(interests, ($interests: any[]) => {
	return $interests.map(item => `${item.label} is ${item.preference.toLowerCase()}.`).join(' ');
});

