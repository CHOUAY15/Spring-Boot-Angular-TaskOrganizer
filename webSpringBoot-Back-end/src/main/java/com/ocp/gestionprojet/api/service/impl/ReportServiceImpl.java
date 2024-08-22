package com.ocp.gestionprojet.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import com.ocp.gestionprojet.api.exception.EntityNotFoundException;
import com.ocp.gestionprojet.api.mapper.ReportMapper;
import com.ocp.gestionprojet.api.model.dto.reportDto.ReportDto;
import com.ocp.gestionprojet.api.model.entity.MemberEntity;
import com.ocp.gestionprojet.api.model.entity.ProjectEntity;
import com.ocp.gestionprojet.api.model.entity.ReportEntity;
import com.ocp.gestionprojet.api.repository.MemberRepository;
import com.ocp.gestionprojet.api.repository.ProjectRepository;
import com.ocp.gestionprojet.api.repository.ReportRepository;
import com.ocp.gestionprojet.api.service.interfaces.ReportService;
@Service


public class ReportServiceImpl  implements ReportService{

    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ReportMapper reportMapper;


   @Override
    public ReportDto addReport(ReportDto reportDto) throws EntityNotFoundException {

        MemberEntity memberEntity=memberRepository.findById(reportDto.getMembreId())
                      .orElseThrow(() -> new EntityNotFoundException("Member not found"));

        ProjectEntity projectEntity = projectRepository.findById(reportDto.getProjetId())
        .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        ReportEntity reportEntity=new ReportEntity();
        reportEntity.setMember(memberEntity);
        reportEntity.setProject(projectEntity);
        reportEntity.setPath(reportDto.getPath());
        reportEntity.setName(reportDto.getName());
        ReportEntity savedReport = reportRepository.save(reportEntity);

               
        return reportMapper.toDto(savedReport);
    }

    @Override
    public void deleteReport(Integer id) throws EntityNotFoundException {
        ReportEntity reportEntity=reportRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        MemberEntity memberEntity=memberRepository.findById(reportEntity.getMember().getId())
        .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        memberEntity.setReport(null);
        memberRepository.save(memberEntity);

       reportRepository.deleteById(id);
    }

    @Override
    public List<ReportDto> findReportByMembre(Integer id) {
       List<ReportEntity> teams = reportRepository.findBymemberId(id);
        return teams.stream()
                .map(reportMapper::toDto)
                .collect(Collectors.toList());
    }
    
}
