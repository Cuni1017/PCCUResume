//package com.example.demo.dao.vacancies;
//
//import com.example.demo.dto.vacancies.VacanciesDto;
//import com.example.demo.model.Company;
//import com.example.demo.model.vacancies.Vacancies;
//
//import com.example.demo.model.vacancies.VacanciesCounty;
//import jakarta.persistence.criteria.*;
//import org.apache.commons.lang3.StringUtils;
//import lombok.NoArgsConstructor;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.List;
//
//
//@NoArgsConstructor
//
//
//@Component
//public class VacanciesSpecification implements Specification<Vacancies> {
//    private List<String> technology;
//    private VacanciesCounty county;
//    private String order;
//    private String salaryType;
//    private int salaryMax;
//    private int salaryMin;
//    private int page;
//    private int limit;
//
//    public VacanciesSpecification(List<String> technology, String order, VacanciesCounty county, String salaryType, int salaryMax, int salaryMin, int page, int limit) {
//        this.technology = technology;
//        this.county = county;
//        this.order = order;
//        this.salaryType = salaryType;
//        this.salaryMax = salaryMax;
//        this.salaryMin = salaryMin;
//        this.page = page;
//        this.limit = limit;
//    }
//
//    @Override
//    public Predicate toPredicate(Root<Vacancies> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
//        List<Predicate> predicates = new ArrayList<>();
//
//        Join<Vacancies, Company> joinCompany = root.join("company", JoinType.INNER);
//
//        if (technology != null && !technology.isEmpty()) {
//            for (String tech : technology) {
//                if(StringUtils.isNotBlank(tech)){
//                    predicates.add(criteriaBuilder.like(root.get("vacanciesSkill"), "%" + tech + "%"));
//                }
//            }
//        }
//
//        if (county != null) {
//            predicates.add(criteriaBuilder.equal(root.get("vacanciesCounty"), county));
//        }
//
//        if (StringUtils.isNotBlank(salaryType) && salaryMax > 0 && salaryMin > 0) {
//            if (salaryType.equals("year")) {
//                predicates.add(criteriaBuilder.between(root.get("vacanciesTopMoney"), salaryMin, salaryMax));
//            } else if (salaryType.equals("month")) {
//                predicates.add(criteriaBuilder.between(root.get("vacanciesTopMoney"), salaryMin * 12, salaryMax * 12));
//            }
//        }
//
//        query.orderBy(criteriaBuilder.asc(root.get(order)));
//        query.select()
//        Root<VacanciesDto> root = query.from(VacanciesDto.class);
//        return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
//    }
//
//    public Pageable getPage() {
//        if (StringUtils.isBlank(order)) {
//            order = "id";
//        }
//        return PageRequest.of(page, limit, Sort.Direction.ASC, order);
//    }
//}