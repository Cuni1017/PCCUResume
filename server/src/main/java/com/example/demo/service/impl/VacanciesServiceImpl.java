    package com.example.demo.service.impl;

    //import com.example.demo.dao.vacancies.VacanciesSpecification;

    import com.example.demo.dao.CountyRepository;
    import com.example.demo.dao.SkillRepository;
    import com.example.demo.dao.UserRepository;
    import com.example.demo.dao.vacancies.VacanciesDao;
    import com.example.demo.dao.vacancies.VacanciesRepository;
    import com.example.demo.dto.CompanyVacanciesDto;
    import com.example.demo.dto.RestDto;
    import com.example.demo.dto.vacancies.FullVacanciesDto;
    import com.example.demo.dto.vacancies.PageVacanciesDto;
    import com.example.demo.model.User;
    import com.example.demo.model.vacancies.Vacancies;
    import com.example.demo.service.JwtService;
    import com.example.demo.service.VacanciesService;
    import jakarta.servlet.http.HttpServletRequest;
    import lombok.RequiredArgsConstructor;

    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.security.core.context.SecurityContextHolder;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @RequiredArgsConstructor
    @Service
    public class VacanciesServiceImpl implements VacanciesService {

        private final VacanciesRepository vacanciesRepository;
        private final SkillRepository skillRepository;
        private final CountyRepository countyRepository;
        private final VacanciesDao vacanciesDao;
        private final UserRepository userRepository;
        private final JwtService jwtService;

        @Override
        public Object findPageVacancies(List<String> county, List<String> technology, String salaryType, Long salaryMax, int salaryMin, String order, int page, int limit, User user) {
            int selectOffset = getSelectOffset(page, limit);
            int selectLimit = getSelectLimit(page, limit);

            List<CompanyVacanciesDto> companyVacanciesDto; // 声明变量

            if (user == null) {
                companyVacanciesDto = vacanciesDao.findPageVacancies(county, technology, salaryType, salaryMax, salaryMin, order, selectLimit, selectOffset);
            } else {
                companyVacanciesDto = vacanciesDao.findPageVacancies(county, technology, salaryType, salaryMax, salaryMin, order, selectLimit, selectOffset, user.getId());
            }

            long count = companyVacanciesDto.stream().count();
            int intCount = (int)count;
            PageVacanciesDto pageVacanciesDto = PageVacanciesDto.builder()
                    .companyVacanciesDto(companyVacanciesDto)
                    .page(page)
                    .size(limit)
                    .total(intCount)
                    .build();

            RestDto restDto = RestDto.builder()
                    .data(pageVacanciesDto)
                    .message("查询成功")
                    .build();
            return restDto;
        }

        @Override
        public Object findFullVacanciesById(String vacanciesId) {
            FullVacanciesDto fullVacanciesDto = vacanciesDao.findFullVacanciesById(vacanciesId);
            Vacancies vacancies =vacanciesRepository.findById(vacanciesId).orElseThrow(()->new RuntimeException("vacanciesId:查不到"));
            Integer VacanciesView = vacancies.getVacanciesView();
            VacanciesView++;
            vacancies.setVacanciesView(VacanciesView);
            vacanciesRepository.save(vacancies);
            System.out.println(fullVacanciesDto);
           RestDto restResponse = RestDto.builder()
                    .data(fullVacanciesDto)
                    .message("查詢成功")
                    .build();
            return restResponse;
        }

        @Override
        public Object findSkills() {
            return skillRepository.findAll();
        }

        @Override
        public Object findCounties() {
            return countyRepository.findAll();
        }


        private List<String> findSkillName(){
            return  skillRepository.findSkillName();

        }
        private List<String> findCountyName(){
            return  countyRepository.findCountyName();

        }

//        private int getSelectOffset(int page,int limit){
//            return (page-1)*limit;
//        }
//        private int getSelectLimit(int page,int limit){
//            return page*limit;
//        }

    //        if(county != null){
    //            county = " v.vacancies_county = " + "'"+county + "'";
    //        }else{
    //            county = "1=1";
    //        }
    //        return vacanciesDao.getPageVacancies(technology,  order,  county, salaryType, salaryMax, salaryMin,page,limit);
    //        System.out.println("county1:"+county);
    //        System.out.println("檢查"+technology);
    //        System.out.println("檢查"+technology1);
    //        System.out.println("檢查"+county1);
    //        System.out.println("檢查"+salaryType);
    //        System.out.println("檢查"+salaryMax);
    //        System.out.println("檢查"+salaryMin);
    //        Pageable pageable = PageRequest.of(page -1 , limit, Sort.by("vacancies_id"));
    //String county3 = null;



    //    public Object findAll(List<String> technology, String order, VacanciesCounty county,String salaryType, int salaryMax, int salaryMin, int page, int limit) {
    //
    //        System.out.println("service order"+order);
    //        String T = technology.stream()
    //                .map(value->"column LIKE '%" + value + "%'")
    //                .collect(Collectors.joining(" OR "));

    //        VacanciesSpecification vacanciesSpecification1 = new VacanciesSpecification(technology,  order, county,salaryType  , salaryMax,  salaryMin, page, limit);
    //
    //        System.out.println(vacanciesSpecification1);
    //        Pageable pageable = vacanciesSpecification1.getPage();
    //        System.out.println(pageable);
    //        Page<Vacancies> vacancies = vacanciesRepository.findAll(vacanciesSpecification1,pageable);
    //        System.out.println(vacancies.getContent());
    //        return vacancies;

        }
    //
    //

